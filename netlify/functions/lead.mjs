export default async (req) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
  
  try {
    const data = await req.json();
    
    const name = data.name?.trim();
    const phone = data.phone?.trim();
    const type = data.type?.trim();
    
    // Validate the form
    if (!name || !phone || !type) {
      return new Response(
        JSON.stringify({
          error: "All fields are required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    /*
    * We will connect amoCRM here.
    *
    * For now, just return the received data.
    */
    
    console.log("New website lead:", {
      name,
      phone,
      type
    });
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead received",
        data: {
          name,
          phone,
          type
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
  } catch (error) {
    
    console.error("Function error:", error);
    
    return new Response(
      JSON.stringify({
        error: "Invalid request"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};