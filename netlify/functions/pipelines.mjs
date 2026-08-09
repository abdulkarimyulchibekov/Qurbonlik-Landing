export default async () => {
  try {
    const token = process.env.AMOCRM_TOKEN;
    
    const response = await fetch(
      "https://qurbonlikuz.amocrm.ru/api/v4/leads/pipelines",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    const data = await response.json();
    
    return new Response(
      JSON.stringify(data, null, 2),
      {
        status: response.status,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message
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