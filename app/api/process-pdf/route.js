import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { ConvexHttpClient } from "convex/browser";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import { chatSession } from '@/components/AIModel';

export async function POST(request) {

  // Create a Convex HTTP client
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  const body = await request.json();
  if (!body.fileUrl) {
    return NextResponse.json({
      status: 400,
      body: {
        message: "File URL is required"
      }
    });
  }

  if (!body.fileId) {
    return NextResponse.json({
      status: 400,
      body: {
        message: "File Param is required"
      }
    });
  }

  try {
    // Check if file exists using query
    const fileExists = await convex.mutation("myActions:checkFileId", { fileId: body.fileId });
    if (fileExists) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "File name already exists"
        }
      });
    }

    // Process the PDF
    const pdf = await fetch(body.fileUrl);
    const pdfBlob = await pdf.blob();
    
    const loader = new WebPDFLoader(pdfBlob);
    const document = await loader.load();
    
    const textSplitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 20,
    });
    
    const splitDocs = await textSplitter.splitDocuments(document);
    
    // Extract text from documents to pass to Convex
    const splitText = splitDocs.map(doc => doc.pageContent);
    
    // Call the Convex action to ingest the documents
    await convex.action("myActions:ingest", { 
      splitText: splitText,
      fileId: body.fileId 
    });
    
    return NextResponse.json({
      status: 200,
      body: {
        message: "PDF processed and ingested successfully",
        documentCount: splitDocs.length
      }
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Error processing PDF: " + error.message
      }
    });
  }
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const fileId = searchParams.get("fileId");

  if (!query || !fileId) {
    return NextResponse.json({
      status: 400,
      body: {
        message: "Both query and fileId are required"
      }
    });
  }

  try {
    // Create a Convex HTTP client
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

      // Call the search action in Convex
      const searchResults = await convex.action("myActions:search", { query, fileId });

      const json_result = JSON.parse(searchResults);
      let context = "";
      
      json_result && json_result.forEach(item => {
        context = context + item.pageContent;
      });
      

      const ddgo = new DuckDuckGoSearch({maxResults:1})

      const analyzePrompt = `
        Analyze this context and query, then provide a JSON response with these fields only:
        1. "summary": A concise summary of the context
        2. "improved_query": A better search query to find complementary information on DuckDuckGo considering the context

        ### Context:
        ${context}

        ### Original Query:
        ${query}

        
        ### Expected Output:
          - Return **only** JSON content, **without** enclosing it in backticks.
          - Do **not** mention "json" or any programming language in the response.
          - The response should be directly JSON.parse .
        Format: {"summary": "your summary here", "improved_query": "your query here"}
        
    `;

    const analysisResult = await chatSession.sendMessage(analyzePrompt);
    const analysisText = analysisResult.response.text();
    
    const analysisJson = JSON.parse(analysisText);

      const ddgResult = await ddgo.invoke(analysisJson.improved_query)
      
      const finalPrompt = `
      Provide a well-structured response in valid HTML **without** using triple backticks (\`\`\`) or specifying "html".
      The response should be **pure HTML** and should directly be ready to render.
      
      ### Document Context Summary:
      ${analysisJson.summary}
      
      ### Web Search Results:
      ${JSON.stringify(ddgResult)}

      ### Original Context:
      ${context}

      ### Question:
      ${query}

      ### Expected Output:
      - Return **only** HTML content, **without** enclosing it in backticks.
      - Do **not** mention "html" or any programming language in the response.
      - Include both the document context insights and relevant web search information.
      - The response should be directly insertable into an HTML editor.
      - Use proper HTML structure with div elements, headings, and styling for clarity.
      - Only Give me the data Inside Body tag
    `;

    const ai_result = await chatSession.sendMessage(finalPrompt);
    const cleanHTML = ai_result.response.text();

    return NextResponse.json({
      status: 200,
      body: {
        message: "Search completed successfully",
        results: cleanHTML
      }
    });
  } catch (error) {
    console.error("Error executing search:", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Error executing search: " + error.message
      }
    });
  }
}