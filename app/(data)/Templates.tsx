export default  [
    {
        name: 'Blog Content',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/3959/3959425.png',
        slug: 'blog-content-generation',
        aiPrompt: 'Generate Blog Content based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic',
                field: 'input',
                name: 'topic',
                required:true
            },
            {
                label: 'Enter blog Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {

        name: 'Youtube Description',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111748.png',
        slug: 'youtube-description',
        aiPrompt: 'Generate Youtube description with emoji under 4-5 lines based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic/title',
                field: 'input',
                name: 'topic',
                required:true
            },
            {
                label: 'Enter youtube Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Rewrite Article (Plagiarism Free)',
        desc: 'Use this tool to rewrite existing Article or Blog Post which can bypass AI detectors and also make it plagiarism free.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3131/3131607.png',
        category: 'Rewriting Tool',
        slug: 'rewrite-article',
        aiPrompt: 'Rewrite give article without any Plagiarism in rich text editor format',
        form: [
            {
                label: '🤖 Provide your Article/Blogpost or any other content to rewrite.',
                field: 'textarea',
                name: 'article',
                required:true
            }
        ]
    },
    {
        name: 'Instagram Post/Reel Idea',
        desc: 'An AI tool that generate New and trending instagram idea depends on your niche',
        icon: 'https://cdn-icons-png.flaticon.com/128/174/174855.png',
        category: 'instagram',
       
        slug: 'instagram-post-idea-generator',
        aiPrompt: 'Generate 5-10 Instagram idea depends on niche with latest trend and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords / Niche for your instagram idea',
                field: 'input',
                name: 'keywords',
                required:true
            },
           
        ]
    },
    {
        name: 'Write Code',
        desc: 'AI Model to generate programming code in any language',
        icon:'https://cdn-icons-png.flaticon.com/128/6062/6062646.png',
        category: 'Coding',
       
        slug: 'write-code',
        aiPrompt: 'Depends on user codeDescription write a code and give output in  in rich text editor format in code block ',
        form: [
            {
                label: 'Enter description of code you want along with Programming Lang',
                field: 'textarea',
                name: 'codeDesscripton',
                required:true
            },
           
        ]
    },
    
    {
        name: 'Product Description',
        desc: 'This is your AI-powered SEO expert, creating captivating and keyword-rich e-commerce product descriptions to boost your online sales.',
        icon:'https://cdn-icons-png.flaticon.com/128/2522/2522605.png',
        category: 'Marketting',
       
        slug: 'product-description',
        aiPrompt: 'Depends on user productName and description generate small description for product for e-commer business give output  in rich text editor format  ',
        form: [
            {
                label: 'Product Name',
                field: 'input',
                name: 'productName',
                required:true
            },
            {
                label: 'Product Details',
                field: 'textarea',
                name: 'outline',
                required:true
            },
           
        ]
    },
    {
        "name": "Legal Act Finder",
        "desc": "An AI-powered legal assistant that helps users find relevant legal acts, regulations, and case laws based on their queries.",
        "icon": "https://cdn-icons-png.flaticon.com/128/2721/2721265.png",
        "category": "Legal",
        "slug": "legal-finder-act",
        "aiPrompt": "Based on the user's query, retrieve relevant legal acts, laws, and case references. Provide the output in a structured, easy-to-read format suitable for legal documentation.",
        "form": [
            {
                "label": "Legal Query",
                "field": "textarea",
                "name": "legalQuery",
                "required": true
            },
            {
                "label": "Jurisdiction (Optional)",
                "field": "input",
                "name": "jurisdiction",
                "required": false
            }
        ]
    },
    {
        "name": "LinkedIn Post Generator",
        "desc": "An AI tool that helps you craft engaging and professional LinkedIn posts based on your provided topic or keywords.",
        "icon": "https://cdn-icons-png.flaticon.com/128/145/145807.png",
        "category": "LinkedIn",
        "slug": "linkedin-post-generator",
        "aiPrompt": "Generate a professional LinkedIn post based on the given topic or keywords. Ensure it is engaging, structured, and suitable for a LinkedIn audience. Output in rich text editor format.",
        "form": [
            {
                "label": "Enter LinkedIn Post Topic/Keywords",
                "field": "input",
                "name": "keywords",
                "required": true
            },
            {
                "label": "Provide Additional Context (Optional)",
                "field": "textarea",
                "name": "outline"
            }
        ]
    },
    
    {
        "name": "Resume Builder",
        "desc": "An AI tool to create professional resumes based on your details and preferences.",
        "category": "Career",
        "icon": "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
        "slug": "resume-builder",
        "aiPrompt": "Generate a professional resume based on user input in a structured format.",
        "form": [
            { "label": "Enter your full name", "field": "input", "name": "name", "required": true },
            { "label": "Enter your experience", "field": "textarea", "name": "experience", "required": true },
            { "label": "Enter your skills", "field": "textarea", "name": "skills", "required": true }
        ]
    },
    {
        "name": "Recipe Finder",
        "desc": "Find recipes based on available ingredients or dietary preferences.",
        "category": "Food & Cooking",
        "icon": "https://cdn-icons-png.flaticon.com/128/1046/1046784.png",
        "slug": "recipe-finder",
        "aiPrompt": "based on these ingredients: {ingredients} and cuisine type: {cuisine}",
        "form": [
            { 
                "label": "Select Cuisine Type",
                "field": "dropdown",
                "name": "cuisine",
                "options": [
                    "Italian",
                    "Chinese",
                    "Indian",
                    "Mexican",
                    "Japanese",
                    "Thai",
                    "Mediterranean",
                    "French",
                    "Korean",
                    "American"
                ],
                "required": true
            },
            { 
                "label": "Enter available ingredients", 
                "field": "textarea", 
                "name": "ingredients", 
                "required": true 
            }
        ]
    },
    {
        "name": "Roadmap for Everything",
        "desc": "Get AI-generated step-by-step roadmaps for learning and achieving goals.",
        "category": "Education & Career",
        "icon": "https://cdn-icons-png.flaticon.com/128/1256/1256650.png",
        "slug": "roadmap-generator",
        "aiPrompt": "Generate a step-by-step roadmap for learning or achieving a goal based on user input.",
        "form": [
            { "label": "Enter your goal or skill to learn", "field": "input", "name": "goal", "required": true }
        ]
    },
    {
        "name": "Mental Health Awareness",
        "desc": "An AI tool to provide mental health tips, stress management techniques, and supportive resources.",
        "category": "Health & Wellness",
        "icon": "https://cdn-icons-png.flaticon.com/128/1048/1048955.png",
        "slug": "mental-health-awareness",
        "aiPrompt": "Provide mental health tips and stress management advice based on user input.",
        "form": [
            { "label": "Describe your current mood or stress level", "field": "textarea", "name": "mood", "required": true }
        ]
    },
    {
        name: 'AI Story Generator',
        desc: 'Generate engaging short stories based on a prompt.',
        category: 'Content Creation',
        icon: 'https://cdn-icons-png.flaticon.com/128/3898/3898082.png',
        slug: 'ai-story-generator',
        aiPrompt: 'Create a short story based on user input in rich text format.',
        form: [
            { label: 'Enter story prompt', field: 'textarea', name: 'prompt', required: true }
        ]
    },
    {
        name: 'Podcast Episode Ideas',
        desc: 'Generate unique topics for podcast episodes.',
        category: 'Podcasting',
        icon: 'https://cdn-icons-png.flaticon.com/128/2920/2920296.png',
        slug: 'podcast-episode-ideas',
        aiPrompt: 'Suggest unique podcast topics based on user input.',
        form: [
            { label: 'Enter podcast niche or theme', field: 'input', name: 'niche', required: true }
        ]
    },
    {
        name: 'Viral Tweet Generator',
        desc: 'Create tweets optimized for engagement.',
        category: 'Social Media',
        icon: 'https://cdn-icons-png.flaticon.com/128/733/733579.png',
        slug: 'viral-tweet-generator',
        aiPrompt: 'Generate a highly engaging tweet based on user input.',
        form: [
            { label: 'Enter topic or keywords', field: 'input', name: 'keywords', required: true }
        ]
    },
    {
        name: 'Catchy Email Subject Lines',
        desc: 'Create subject lines that boost email open rates.',
        category: 'Email Marketing',
        icon: 'https://cdn-icons-png.flaticon.com/128/553/553416.png',
        slug: 'email-subject-line-generator',
        aiPrompt: 'Generate engaging email subject lines based on the email topic.',
        form: [
            { label: 'Enter email topic', field: 'input', name: 'topic', required: true }
        ]
    },
    {
        name: 'Ad Copy Generator',
        desc: 'Generate compelling ad copies for different platforms.',
        category: 'Marketing',
        icon: 'https://cdn-icons-png.flaticon.com/128/1904/1904165.png',
        slug: 'ad-copy-generator',
        aiPrompt: 'Generate a high-converting ad copy based on product details.',
        form: [
            { label: 'Enter product/service name', field: 'input', name: 'product', required: true },
            { label: 'Enter target audience', field: 'textarea', name: 'audience', required: true }
        ]
    },
    
    {
        name: 'Social Media Caption Generator',
        desc: 'Generate creative captions for Instagram, Facebook, and other platforms.',
        category: 'Social Media',
        icon: 'https://cdn-icons-png.flaticon.com/128/747/747376.png',
        slug: 'social-media-caption-generator',
        aiPrompt: 'Generate an engaging social media caption based on user input.',
        form: [
            { label: 'Enter post theme or keywords', field: 'input', name: 'theme', required: true }
        ]
    },
    {
        "name": "AI Travel Itinerary Planner",
        "desc": "Get a personalized travel itinerary based on your destination, budget, and interests.",
        "category": "Travel & Adventure",
        "icon": "https://cdn-icons-png.flaticon.com/128/201/201623.png",
        "slug": "travel-itinerary-planner",
        "aiPrompt": "Generate a travel itinerary for {destination} based on the user's preferences, including budget, trip duration, and interests.",
        "form": [
            {
                "label": "Enter your travel destination",
                "field": "input",
                "name": "destination",
                "required": true
            },
            {
                "label": "Trip Duration (Days)",
                "field": "input",
                "name": "duration",
                "required": true
            },
            {
                "label": "Select your interests",
                "field": "select",
                "name": "interests",
                "options": ["Food", "Adventure", "Culture", "Relaxation", "Shopping"],
                "required": true
            },
            {
                "label": "Budget Level",
                "field": "select",
                "name": "budget",
                "options": ["Low", "Medium", "Luxury"],
                "required": true
            }
        ]
    },
    {
        "name": "AI-Powered Business Name Generator",
        "desc": "Generate unique, catchy, and brandable business names based on keywords and industry.",
        "category": "Business & Branding",
        "icon": "https://cdn-icons-png.flaticon.com/128/2645/2645897.png",
        "slug": "business-name-generator",
        "aiPrompt": "Generate a list of creative and brandable business names based on the user's keywords and industry.",
        "form": [
            {
                "label": "Enter keywords related to your business",
                "field": "input",
                "name": "keywords",
                "required": true
            },
            {
                "label": "Select Industry",
                "field": "select",
                "name": "industry",
                "options": ["Technology", "Fashion", "Food & Beverage", "Health & Wellness", "Finance", "Education", "E-commerce", "Other"],
                "required": true
            }
        ]
    },
    {
        name:'Blog Title',
        desc:'An AI tool that generate blog title depends on yout blog information',
        category:'Blog',
        icon:'https://cdn-icons-png.flaticon.com/128/11497/11497896.png',
        aiPrompt:'Give me 5 blog topic idea in bullet wise only based on give niche & outline and give me result in Rich text editor format',
        slug:'generate-blog-title',
        form:[
            {
                label:'Enter your blog niche',
                field:'input',
                name:'niche',
                required:true
            },
            {
                label:'Enter blog outline',
                field:'textarea',
                name:'outline',
                
            }
        ]
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Blog',
        icon: 'https://image.shutterstock.com/image-vector/search-icon-vector-illustration-magnifying-260nw-2497142935.jpg',
        slug: 'blog-topic-idea',
        aiPrompt: 'Generate top 5 Blog Topic Ideas in bullet point only, (no Description) based on niche in rich text editor format',
        form: [
            {
                label: 'Enter your Niche',
                field: 'input',
                name: 'niche',
                required:true
            },
        ]
    },
    {
        name: 'Youtube SEO Title',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Youtube Tools',
        icon: 'https://cdn-icons-png.flaticon.com/128/174/174883.png',
        slug: 'youtube-seo-title',
        aiPrompt: 'Give me Best SEO optimized high ranked 5 title ideas bullet wise only bases on keywords and outline and give me result in HTML tags format',
        form: [
            {
                label: 'Enter your youtube video topic keyowords',
                field: 'input',
                name: 'keywords',
                required:true
            },
            {
                label: 'Enter youtube description Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]

    },
    
    {
        name: 'Youtube Tags',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/4674/4674918.png',
        slug: 'youtube-tag',

        aiPrompt: 'Generate 10 Youtube tags in bullet point based on title and outline in rich text editor format',

        form: [
            {
                label: 'Enter your youtube title',
                field: 'input',
                name: 'title',
                required:true
            },
            {
                label: 'Enter youtube video Outline here (Optional)',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },

    
    {
        name: 'Text Improver',
        desc: 'This handy tool refines your writing, eliminating errors and redundancies for a clear, readable result. It also offers a comprehensive tone analysis and suggests better word choices.',
        icon: 'https://cdn-icons-png.flaticon.com/128/12860/12860749.png',
        category: 'Writing Assistant',
        slug: 'text-improver',
        aiPrompt: 'Given textToImprove, Rewrite text without any grammar mistake and professionally in rich text editor format',
        form: [
            {
                label: 'Enter text that you want to re-write or improve',
                field: 'textarea',
                name: 'textToImprove'
            }
        ]
    },
    {
        name: 'YouTube Video Summarizer',
        desc: 'An AI-powered tool that extracts key points and generates a concise summary of any YouTube video.',
        category: 'YouTube Tools',
        icon: 'https://cdn-icons-png.flaticon.com/128/1384/1384060.png',
        slug: 'youtube-video-summarizer',
        aiPrompt: 'Summarize the key points of the given YouTube video link in a structured format with bullet points. Ensure the summary is concise and informative.',
        form: [
            {
                label: 'Enter YouTube Video Link',
                field: 'input',
                name: 'videoLink',
                required: true
            }
        ]
    },
    {
        name: 'Instagram Hash Tag Generator',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        icon: 'https://cdn-icons-png.flaticon.com/128/7045/7045432.png',
        category: 'blog',
       
        slug: 'instagram-hash-tag-generator',
        aiPrompt: 'Generate 15 Instagram hash tag depends on a given keywords and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords for your instagram hastag',
                field: 'input',
                name: 'keywords',
                required:true
            },
           
        ]
    },
    
    {
        name: 'English Grammer Check',
        desc: 'AI Model to Correct your english grammer by providing the text',
        icon:'https://cdn-icons-png.flaticon.com/128/5278/5278596.png',
        category: 'english',
       
        slug: 'english-grammer-checker',
        aiPrompt: 'Rewrite the inputText by correcting the grammer and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter text to correct the grammer',
                field: 'input',
                name: 'inputText',
                required:true
            },
           
        ]
    },
    {
        name: 'Code Bug Detector',
        desc: 'This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in a straightforward, user-friendly way.',
        icon:'https://cdn-icons-png.flaticon.com/128/17065/17065883.png',
        category: 'code-bug-detector',
       
        slug: 'code-bug-detector',
        aiPrompt: 'Depends on user codeInput find bug in code and give solution and give output in  in rich text editor format in code block ',
        form: [
            {
                label: 'Enter code which you want to test bug',
                field: 'textarea',
                name: 'codeInput',
                required:true
            },
           
        ]
    },
    {
        name: 'Tagline Generator',
        desc: 'Struggling to find the perfect tagline for your brand? Let our AI-tool assist you in creating a tagline that stands out.',
        icon:'https://cdn-icons-png.flaticon.com/128/16823/16823329.png',
        category: 'Marketting',
       
        slug: 'tagline-generator',
        aiPrompt: 'Depends on user productName and outline generate catchy 5-10 tagline for the business product and give output  in rich text editor format ',
        form: [
            {
                label: 'Product/Brand Name',
                field: 'input',
                name: 'productName',
                required:true
            },
            {
                label: 'What you are selling / Marketting',
                field: 'textarea',
                name: 'outline',
                required:true
            },
           
        ]
    },
    {
        "name": "Career Roadmap",
        "desc": "An AI-powered career roadmap assistant that provides structured learning paths for various professions, including necessary skills, certifications, and resources.",
        "icon": "https://cdn-icons-png.flaticon.com/128/2721/2721265.png",
        "category": "Career Guidance",
        "slug": "career-roadmap",
        "aiPrompt": "Based on the user's selected profession and current skill level, generate a personalized career roadmap with recommended skills, courses, certifications, and job prospects.",
        "form": [
            {
                "label": "Select Profession",
                "field": "dropdown",
                "name": "profession",
                "options": [
                    "Software Engineer",
                    "Data Scientist",
                    "AI/ML Engineer",
                    "Blockchain Developer",
                    "Cybersecurity Expert",
                    "UI/UX Designer",
                    "Product Manager",
                    "Digital Marketer",
                    "Finance Analyst",
                    "Doctor",
                    "Lawyer"
                ],
                "required": true
            },
            {
                "label": "Current Skill Level",
                "field": "dropdown",
                "name": "skillLevel",
                "options": ["Beginner", "Intermediate", "Advanced"],
                "required": true
            }
        ]
    },
    
    {
        "name": "E-Learning App",
        "desc": "An AI-powered tool to provide personalized learning materials and courses.",
        "category": "Education",
        "icon": "https://cdn-icons-png.flaticon.com/128/1828/1828911.png",
        "slug": "e-learning-app",
        "aiPrompt": "Suggest personalized learning resources based on user interest.",
        "form": [
            { "label": "Enter your learning interest or subject", "field": "input", "name": "subject", "required": true }
        ]
    }
]