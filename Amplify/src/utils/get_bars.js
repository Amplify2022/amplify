export default async () => {
  const res = await fetch(
    'http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/list',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => {
      if (response.status === 200) {
        const data = response.json();
        return Promise.all([data]);
      }
    })
    .then(data => {
      return data[0];
    });
};

// export default async () => {
//   const res = await fetch(
//     'http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/list',
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   );

//   const json = await res.json();
//   console.log('555555', json);

//   if (!res.ok) {
//     return [];
//   }

//   // const {
//   //   bars: {items},
//   // } = json;

//   return json;
// };
