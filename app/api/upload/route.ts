import { NextResponse, NextRequest } from "next/server";
import { db } from "@/utils/db";
import { FileStorage } from "@/utils/fileSchema";
import { getAuth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        // Get the authenticated user from Clerk
        const auth = getAuth(req);
        const user = await currentUser();
        
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const userEmail = user.emailAddresses[0]?.emailAddress;
        
        if (!userEmail) {
            return NextResponse.json({ error: 'Invalid user email' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const category = formData.get('category') as string || 'uploads';

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate file size (e.g., 10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File size exceeds limit (10MB)" },
                { status: 400 }
            );
        }

        // Convert file to base64 for storage
        const buffer = await file.arrayBuffer();
        const base64Content = Buffer.from(buffer).toString('base64');

        // Store file in database
        const result = await db.insert(FileStorage).values({
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            fileContent: base64Content,
            category: category,
            createdBy: userEmail,
        }).returning();

        return NextResponse.json({
            message: "File uploaded successfully",
            file: {
                id: result[0].id,
                fileName: result[0].fileName,
                fileType: result[0].fileType,
                fileSize: result[0].fileSize,
                category: result[0].category,
                createdAt: result[0].createdAt,
                lastModified: result[0].lastModified
            }
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: "Error uploading file" },
            { status: 500 }
        );
    }
}