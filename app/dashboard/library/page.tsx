"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid2X2, List, Search, Filter, Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app, { storage } from "@/lib/firebase";

type FileStatus = "idle" | "uploading" | "success" | "error";

interface FileUpload {
  file: File;
  progress: number;
  status: FileStatus;
}

interface Resource {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  category: string;
}

type ViewMode = "grid" | "list";

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resources, setResources] = useState<Resource[]>([]);

  // Fetch files from the database
  const fetchFiles = async () => {
    try {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error('Please sign in to view files');
        return;
      }
      const token = await currentUser.getIdToken();

      const response = await fetch('/api/get-files', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error('Failed to fetch files');
    }
  };

  // Fetch files on component mount and after successful upload
  useEffect(() => {
    fetchFiles();
  }, []);


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsLoading(true);
    const newUploads: FileUpload[] = Array.from(files).map(file => ({
      file,
      progress: 0,
      status: "uploading"
    }));

    setFileUploads(prev => [...prev, ...newUploads]);

    try {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error('Please sign in to upload files');
        return;
      }

      for (const upload of newUploads) {
        try {
          const storageRef = ref(storage, `uploads/${currentUser.uid}/${upload.file.name}`);
          
          const uploadTask = uploadBytesResumable(storageRef, upload.file);

          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setFileUploads(prev =>
                prev.map(fu =>
                  fu.file === upload.file
                    ? { ...fu, progress: Math.round(progress) }
                    : fu
                )
              );
            },
            (error) => {
              console.error('Upload error:', error);
              toast.error(`Error uploading ${upload.file.name}: ${error.message}`);
              setFileUploads(prev =>
                prev.map(fu =>
                  fu.file === upload.file
                    ? { ...fu, status: "error" }
                    : fu
                )
              );
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setFileUploads(prev =>
                prev.map(fu =>
                  fu.file === upload.file
                    ? { ...fu, progress: 100, status: "success" }
                    : fu
                )
              );
              toast.success(`${upload.file.name} uploaded successfully`);
            }
          );
        } catch (error: any) {
          console.error('Upload error:', error);
          toast.error(`Error uploading ${upload.file.name}: ${error.message}`);
          setFileUploads(prev =>
            prev.map(fu =>
              fu.file === upload.file
                ? { ...fu, status: "error" }
                : fu
            )
          );
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Error uploading files");
      setFileUploads(prev =>
        prev.map(fu =>
          fu.status === "uploading"
            ? { ...fu, status: "error" }
            : fu
        )
      );
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#0F0F0F] text-white rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Library</h1>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileUpload}
        />
        <Button 
          variant="premium" 
          className="flex items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          Upload Files
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search resources..."
            className="pl-10 bg-gray-800 border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
        <Button
          variant="outline"
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="flex items-center gap-2"
        >
          {viewMode === "grid" ? (
            <>
              <List className="w-4 h-4" />
              List View
            </>
          ) : (
            <>
              <Grid2X2 className="w-4 h-4" />
              Grid View
            </>
          )}
        </Button>
      </div>

      {/* Upload Progress */}
      {fileUploads.length > 0 && (
        <div className="mb-6 space-y-2">
          {fileUploads.map((upload, index) => (
            <div key={index} className="bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{upload.file.name}</span>
                <span className="text-xs text-gray-400">
                  {upload.status === "uploading" && `${upload.progress}%`}
                  {upload.status === "success" && "Completed"}
                  {upload.status === "error" && "Failed"}
                </span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${upload.status === "success" ? "bg-green-500" : upload.status === "error" ? "bg-red-500" : "bg-blue-500"}`}
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resources Grid/List */}
      <div className={`${viewMode === "grid" ? "grid grid-cols-3 gap-4" : "space-y-2"}`}>
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition ${viewMode === "list" ? "flex items-center justify-between" : ""}`}
          >
            {viewMode === "grid" ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{resource.name}</span>
                  <span className="text-xs text-gray-400">{resource.size}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{resource.type}</span>
                  <span>{resource.lastModified}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{resource.name}</span>
                  <span className="text-sm text-gray-400">{resource.type}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{resource.size}</span>
                  <span>{resource.lastModified}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}