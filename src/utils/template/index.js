module.exports = ({ name, dataInicio, dataFim }) => `
    <!doctype html>
    <html>
      <body>
          <div>
          ${name}
          <img  src="" style="width:100%; max-width:156px;">
          </div>
          <div class="relatório">
          <h2>
          Relatório: ${dataInicio} - ${dataFim}
          </h2>
          </div>
      </body>
    </html>
    `;
