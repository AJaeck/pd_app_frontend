   // src/Results.js

   import React from 'react';
   import { Bar } from 'react-chartjs-2';

   function Results() {
       const results = JSON.parse(localStorage.getItem('tappingResults') || '[]');

       const data = {
            labels: results.map(r => new Date(r.date).toLocaleDateString()),
            datasets: [
                {
                    label: '# of Taps',
                    data: results.map(r => r.taps),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        };

       return <Bar data={data} />;

   }

   export default Results;
