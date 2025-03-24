export default  [
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
        name: 'Add Emojis to Text',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        icon: 'https://cdn-icons-png.flaticon.com/128/10851/10851235.png',
        category: 'blog',
        slug: 'add-emoji-to-text',
        aiPrompt: 'Add Emoji to outline text depends on outline and rewrite it in rich text editor format',
        form: [
            {
                label: 'Enter your text to add emojis',
                field: 'textarea',
                name: 'outline',
                required:true
            }
        ]
    },

    {
        name: 'AI Chatbot',
        desc: 'An AI-powered chatbot that answers queries, provides suggestions, and engages in conversation.',
        category: 'Chatbot',
        icon: 'https://cdn-icons-png.flaticon.com/128/4712/4712035.png',
        slug: 'ai-chatbot',
        aiPrompt: 'Act as an AI chatbot that can answer questions, provide recommendations, and assist with various topics. Maintain a friendly and helpful tone in your responses.',
        form: [
            {
                label: 'Enter your query',
                field: 'textarea',
                name: 'query',
                required: true
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
        name: 'YouTube Thumbnail Generator',
        desc: 'Generate high-quality YouTube thumbnails based on video title, niche, and theme.',
        category: 'YouTube Tools',
        icon: 'https://cdn-icons-png.flaticon.com/128/1384/1384060.png',
        slug: 'youtube-thumbnail-generator',
        aiPrompt: 'Generate a high-quality YouTube thumbnail based on the provided video title, niche, and theme. Ensure the image is eye-catching, optimized for engagement, and suitable for a YouTube video thumbnail.',
        form: [
            {
                label: 'Enter YouTube Video Title',
                field: 'input',
                name: 'videoTitle',
                required: true
            },
            {
                label: 'Enter Video Niche (e.g., Tech, Gaming, Education)',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Describe Thumbnail Theme (e.g., Dark Mode, Bright & Colorful)',
                field: 'input',
                name: 'theme'
            }
        ]
    },
    
    
    
    {
        name: 'Instagram Post Generator',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        icon: 'https://cdn-icons-png.flaticon.com/128/5692/5692184.png',
        category: 'blog',
       
        slug: 'instagram-post-generator',
        aiPrompt: 'Generate 3 Instagram post depends on a given keywords and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords for your post',
                field: 'input',
                name: 'keywords',
                required:true
            },
           
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
        name: 'Explain Code',
        desc: 'AI Model to explain programming code in any language',
        icon:'https://cdn-icons-png.flaticon.com/128/10817/10817310.png',
        category: 'Coding',
       
        slug: 'explain-code',
        aiPrompt: 'Depends on user codeDescription explain code line by line and give output in  in rich text editor format in code block ',
        form: [
            {
                label: 'Enter code which you want to understand',
                field: 'textarea',
                name: 'codeDesscripton',
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
        name: 'AI Image Generator',
        desc: 'Create AI-generated images based on your description and preferences.',
        category: 'Image Generation',
        icon: 'https://cdn-icons-png.flaticon.com/128/2921/2921222.png',
        slug: 'ai-image-generator',
        aiPrompt: 'Generate an AI image based on the given description, style, and aspect ratio.',
        form: [
            {
                label: 'Enter Image Description',
                field: 'textarea',
                name: 'description',
                required: true
            },
            {
                label: 'Choose Image Style',
                field: 'select',
                name: 'style',
                options: ['Realistic', 'Anime', 'Cartoon', '3D Render', 'Pixel Art', 'Cyberpunk', 'Abstract'],
                required: true
            },
            {
                label: 'Select Aspect Ratio',
                field: 'select',
                name: 'aspectRatio',
                options: ['Square (1:1)', 'Landscape (16:9)', 'Portrait (9:16)'],
                required: true
            }
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
        "name": "Legal Finder Act",
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
    



]