export const chatHistoryData = [
    // Today
    {
      id: 1,
      title: "Dark Light Mode Toggle",
      category: "today",
      messages: [
        { text: "How do I implement a dark/light mode toggle in React?", isUser: true },
        { text: "To implement a dark/light mode toggle in React, you'll need to create a theme context, implement a toggle function, and apply CSS classes conditionally. Would you like me to show you a code example?", isUser: false },
        { text: "Yes, please show me some code!", isUser: true },
        { text: "Here's a simple implementation using React context:\n\n```jsx\n// ThemeContext.js\nimport { createContext, useState, useEffect } from 'react';\n\nexport const ThemeContext = createContext();\n\nexport const ThemeProvider = ({ children }) => {\n  const [isDarkMode, setIsDarkMode] = useState(false);\n\n  useEffect(() => {\n    // Apply theme class to body\n    document.body.classList.toggle('dark', isDarkMode);\n    return () => document.body.classList.remove('dark');\n  }, [isDarkMode]);\n\n  const toggleTheme = () => setIsDarkMode(!isDarkMode);\n\n  return (\n    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n};\n```", isUser: false }
      ]
    },
    
    // Yesterday
    {
      id: 2,
      title: "Black book project summary",
      category: "yesterday",
      messages: [
        { text: "Can you help me write a summary for my Black Book project?", isUser: true },
        { text: "I'd be happy to help you write a summary for your Black Book project. Could you provide me with some details about what the project is about?", isUser: false },
        { text: "It's a photography portfolio collection of urban night scenes", isUser: true },
        { text: "Here's a draft summary for your Black Book project:\n\n\"Black Book: An Urban Nocturne\" is a curated photography portfolio that captures the essence of city life after dark. This collection explores the interplay of artificial light and shadow that transforms familiar urban landscapes into mysterious and evocative scenes. Through high-contrast black and white photography, the project reveals the hidden character of metropolitan spaces when most inhabitants are asleep, highlighting both the isolation and unexpected beauty found in nocturnal urban environments.", isUser: false }
      ]
    },
    
    // Previous 7 Days
    {
      id: 3,
      title: "Event Details Examples",
      category: "previous7Days",
      messages: [
        { text: "I need examples of how to display event details on a website", isUser: true },
        { text: "Here are several approaches for displaying event details on a website:\n\n1. Card Layout: Present each event as a card with image, title, date, and brief description\n2. Timeline View: Arrange events chronologically along a visual timeline\n3. Calendar Integration: Display events on an interactive calendar\n4. List View: Simple, scannable list with key details\n5. Modal Pop-ups: Show complete details when a user clicks on a condensed event listing\n\nWhich style would you like me to elaborate on?", isUser: false }
      ]
    },
    {
      id: 4,
      title: "Lecture course field missing",
      category: "previous7Days",
      messages: [
        { text: "The course field is missing from my lecture form", isUser: true },
        { text: "Let me help you troubleshoot the missing course field in your lecture form. This could be happening for a few reasons:\n\n1. The form component might not be properly importing or rendering the course field\n2. There might be a conditional rendering issue that's hiding the field\n3. The field might be present but styled with display: none\n4. A recent update might have removed the field from your schema\n\nCould you share the component code where the form is defined?", isUser: false }
      ]
    },
    {
      id: 5,
      title: "Next.js Course Description",
      category: "previous7Days",
      messages: [
        { text: "Write a course description for a Next.js workshop", isUser: true },
        { text: "# Next.js Masterclass: Building Modern Web Applications\n\nThis comprehensive workshop will take you from Next.js fundamentals to advanced techniques used by industry professionals. Over the course of two intensive days, participants will learn how to leverage Next.js features to build performant, SEO-friendly React applications.\n\n**What you'll learn:**\n- Server-side rendering vs. static site generation\n- Data fetching strategies with SWR and React Query\n- Creating API routes and serverless functions\n- Implementing authentication flows\n- Optimizing images and assets\n- Deploying to Vercel and other platforms\n\n**Prerequisites:**\nBasic knowledge of React and JavaScript ES6+. Participants should bring a laptop with Node.js installed.", isUser: false }
      ]
    },
    {
      id: 6,
      title: "React Login and Product API",
      category: "previous7Days",
      messages: [
        { text: "How do I connect my React login form to my product API?", isUser: true },
        { text: "To connect your React login form to your product API, you'll need to:\n\n1. Create a login form component that captures username/email and password\n2. Use state to manage form inputs\n3. Create a submit handler function that makes an API request\n4. Store the authentication token from the response\n5. Use the token for subsequent product API requests\n\nWould you like me to show you some sample code for any of these steps?", isUser: false },
        { text: "Yes, please show the API connection part", isUser: true },
        { text: "Here's how to connect your login form to your API:\n\n```jsx\nconst handleSubmit = async (e) => {\n  e.preventDefault();\n  setIsLoading(true);\n  setError(null);\n  \n  try {\n    // Send login request to your API\n    const response = await fetch('https://your-api.com/auth/login', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        email,\n        password\n      })\n    });\n    \n    const data = await response.json();\n    \n    if (!response.ok) {\n      throw new Error(data.message || 'Login failed');\n    }\n    \n    // Store auth token in localStorage or secure cookie\n    localStorage.setItem('authToken', data.token);\n    \n    // Now you can use this token to fetch products\n    fetchProducts(data.token);\n    \n    // Redirect to products page\n    navigate('/products');\n    \n  } catch (err) {\n    setError(err.message);\n  } finally {\n    setIsLoading(false);\n  }\n};\n\n// Function to fetch products using the token\nconst fetchProducts = async (token) => {\n  try {\n    const response = await fetch('https://your-api.com/products', {\n      headers: {\n        'Authorization': `Bearer ${token}`\n      }\n    });\n    \n    const products = await response.json();\n    // Do something with the products data\n  } catch (err) {\n    console.error('Error fetching products:', err);\n  }\n};\n```", isUser: false }
      ]
    },
    
    // Previous 30 Days
    {
      id: 7,
      title: "Fixing TypeScript Undefined Error",
      category: "previous30Days",
      messages: [
        { text: "How do I fix the TypeScript error: Property 'value' does not exist on type 'never'", isUser: true },
        { text: "This TypeScript error typically occurs when TypeScript cannot infer the type of an array or object properly. Here are several ways to fix it:\n\n1. Define explicit types for your variables\n2. Use type assertions\n3. Add proper type guards\n4. Check if the array/object exists before accessing properties\n\nCould you share the code that's causing this error?", isUser: false },
        { text: "const data = response.data.items.map(item => item.value)", isUser: true },
        { text: "The error suggests TypeScript thinks `items` is of type `never[]` or that `item` is `never`. Here's how to fix it:\n\n```typescript\n// Option 1: Define the type explicitly\ninterface Item {\n  value: string; // or whatever type value should be\n  // other properties...\n}\n\nconst data = response.data.items.map((item: Item) => item.value);\n\n// Option 2: Use type assertion if you're sure about the type\nconst data = response.data.items.map(item => (item as { value: string }).value);\n\n// Option 3: Add type guard\nconst data = response.data.items\n  .filter((item): item is { value: string } => 'value' in item)\n  .map(item => item.value);\n\n// Option 4: Check if property exists\nconst data = response.data.items.map(item => \n  item && 'value' in item ? item.value : null\n);\n```\n\nThe best option depends on your specific situation and why TypeScript is inferring the type as `never`.", isUser: false }
      ]
    }
  ];
  
  // Utility function to get a specific chat by ID
  export const getChatById = (id) => {
    return chatHistoryData.find(chat => chat.id === Number(id)) || null;
  };