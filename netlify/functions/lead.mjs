export default async (req) => {
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
    const { name, phone, type } = await req.json();
    
    // Validate form data
    if (!name || !phone || !type) {
      return new Response(
        JSON.stringify({
          error: "Name, phone and type are required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    const token = process.env.AMOCRM_TOKEN;
    
    if (!token) {
      console.error("AMOCRM_TOKEN is missing");
      
      return new Response(
        JSON.stringify({
          error: "CRM configuration error"
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    /*
    * Create a deal + contact in amoCRM
    */
    const amoResponse = await fetch(
      "https://qurbonlikuz.amocrm.ru/api/v4/leads/complex",
      {
        method: "POST",
        
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        
        body: JSON.stringify([
          {
            name: `Qurbonlik sayti — ${type}`,
            
            _embedded: {
              contacts: [
                {
                  name: name,
                  
                  custom_fields_values: [
                    {
                      field_code: "PHONE",
                      values: [
                        {
                          value: phone,
                          enum_code: "WORK"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        ])
      }
    );
    
    const amoData = await amoResponse.json();
    
    console.log("amoCRM response:", amoData);
    
    if (!amoResponse.ok) {
      return new Response(
        JSON.stringify({
          error: "amoCRM request failed",
          details: amoData
        }),
        {
          status: amoResponse.status,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    /*
    * Success
    */
    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead successfully sent to amoCRM"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
  } catch (error) {
    
    console.error("Server error:", error);
    
    return new Response(
      JSON.stringify({
        error: "Server error"
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