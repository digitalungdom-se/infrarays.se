import React from 'react';

export default () => (
  <div className="row section">
    <h3 className="col-xs-12 col-md-4">Formulär</h3>
    <div className="col-md-12">
      <p>
          Vi som arrangerar Rays vill veta varifrån du kommer, på vilken gymnasieskola du studerar, hur du hört talas om Rays samt vad du tycker om ansökningsprocessen.
          Allt detta för att vi ska kunna bli ännu bättre på att marknadsföra oss samt
          utveckla ansökningprocessen. Fyll därför i formuläret nedan och klicka på skicka för att spara ditt svar.
      </p>
      <div id="surveyCard">
        <div className="card">

          <div className="card-header" styled="<%= surveySuccess %>">
            <a className="card-link" data-toggle="collapse" href="#surveyCollapse" styled="<%= surveySuccess %>">
                Klicka här för att fylla i formuläret
            </a>
          </div>
          <div id="surveyCollapse" className="collapse" data-parent="#surveyCard">

            <div className="card-body">
              <form className="survey" id="survey-form" method="post" action="/survey">

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Stad</span>
                  </div>
                  <input name="city" type="text" className="form-control" aria-label="stad" aria-describedby="basic-addon1" required maxLength="50" placeholder="Vilken stad bor du i?" value="<%= city %>" />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Skola</span>
                  </div>
                  <input name="school" type="text" className="form-control" aria-label="skola" aria-describedby="basic-addon1" required maxLength="100" placeholder="Vilken skola går du på?" value="<%= school %>" />
                </div>

                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Rays</span>
                  </div>
                  <textarea name="rays" className="form-control" aria-label="rays" required maxLength="500" placeholder="Hur hörde du talas om Rays?" />
                </div>

                <div className="card text-center ratingContainer">
                  <div className="card-header">
                      Vad tycker du om ansökningsprocessen?
                  </div>
                  <div className="card-body startContainer">
                    <div className="rating" styled="font-family:sans-serif;font-size: 40px; top: -5px">
                      <label>
                        <input type="radio" name="rating" value="1" />
                        <span className="icon">*</span>
                      </label>
                      <label>
                        <input type="radio" name="rating" value="2" />
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                      </label>
                      <label>
                        <input type="radio" name="rating" value="3" />
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                      </label>
                      <label>
                        <input type="radio" name="rating" value="4" />
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                      </label>
                      <label>
                        <input type="radio" name="rating" value="5" />
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                        <span className="icon">*</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="input-group" styled="margin-top: 20px;">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Processen</span>
                  </div>
                  <textarea name="process" className="form-control" aria-label="With textarea" maxLength="500" placeholder="Hur tycker du ansökningsprocessen kan förbättras?" />
                </div>
                <button type="submit" type="button" className="btn btn-info" styled="position: relative;position: relative; margin-top:15px; left:89%;">Skicka</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
