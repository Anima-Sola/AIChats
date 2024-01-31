const getToken = async () => {
    const response = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer MDZiZjkyMTYtMGEwZS00OTEzLWJiYzYtYTFkMGY0YzRkZWViOjBmNTUwMTZjLTE3ZDQtNGVkMi1hYTI4LWMwMGE0YmZlYWQ1MQ==',
      'RqUID': '06bf9216-0a0e-4913-bbc6-a1d0f4c4deeb',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'scope=GIGACHAT_API_PERS'
  })
    .then(response => response)
    .then(data => {
      // Handle the response data
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    const data = await response.json();
    const accessToken = data.access_token;
    const expiresAt = data.expires_at;
  
    return { accessToken, expiresAt };
  };
  
  // Call the getToken function to obtain the token
  getToken()
    .then((token) => {
      console.log('Access Token:', token.accessToken);
      console.log('Expires At:', token.expiresAt);
    })
    .catch((error) => {
      console.error('Error:', error);
    });