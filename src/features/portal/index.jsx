import React from 'react';
import Center from 'components/Center';
import StyledPlate from 'components/Plate';

export default () => (
  <Center noTop>
    <StyledPlate>
      <div className="title">
        <h1>
          Ansökan för Rays
        </h1>
        <p>
          Tack för att du vill ansöka till Rays! Vi kommer att läsa alla ansökningar och
          återkomma så snart vi kan. Du ser nedan vilka uppgifter vi vill att du sänder in.
          Den 31 mars klockan 23:59 stänger möjligheten att ladda upp
          ansökningar och då kommer din ansökan automatiskt att skickas in till Rays.
          För att din ansökan ska skickas måste du ha laddat upp alla filer samt fyllt i formuläret.
          Fram till detta datum kan du uppdatera en del genom att bara ladda upp
          en ny fil igen. Din gamla fil kommer då ersättas med den nya.

          Alla filer måste vara i pdf-format och de specifika begränsningarna
          för filstorlek och antalet ord står bredvid varje uppladdningsdel.
        </p>

        <p>
            Vi som arrangerar Rays önskar dig ett stort lycka till
            och ser fram emot att få läsa din ansökan!
          <a href="http://raysforexcellence.se/ansok/" rel="noopener noreferrer" target="_blank" styled="text-decoration: none">För mer information tryck här!</a>
        </p>


        <div className="progress">
          <div className="progress-bar progress-bar-striped" role="progressbar" styled="width: <%= (counter/6) * 100 %>%; background-color: #DC0C05;" aria-valuenow="<%= counter %>" aria-valuemin="0" aria-valuemax="6" />
        </div>
        <hr styled="color:#b8b8b8" size="1" />
      </div>
      <div className="container">
        <div className="row section">
          <h3 className="col-xs-12 col-md-4">
CV
            <br />
            {' '}
            <label styled="font-size: 16px;">Max 2 sidor</label>
          </h3>
          <div className="col-md-12">
              Förutom grundläggande information rekommenderas ditt CV innehålla en beskrivning av exempelvis deltagande i såväl naturvetenskapliga som idrottsliga tävlingar,
              utmärkelser i skolan eller andra sammanhang, samt ideellt arbete och förtroendeuppdrag.
          </div>
          <form className="upload" method="post" action="/upload/cv" id="cvForm" encType="multipart/form-data">
            <div className="custom-file">
              <input type="file" className="custom-file-input file-input" name="file" id="cv" />
              <label className=" custom-file-label">Ladda upp CV</label>
            </div>
          </form>
        </div>
        <div className="row section">
          <h3 className="col-xs-12 col-md-4">
Personligt brev
            <br />
            {' '}
            <label styled="font-size: 16px;">Max 600 ord</label>
          </h3>
          <div className="col-md-12">
              Vi som arrangerar Rays vill lära känna dig som ansöker så bra som möjligt.
              I ditt personliga brev vill vi därför att du kortfattat berättar om dina intressen och varför du söker till Rays.
              För oss är det intressant att höra varifrån din passion för naturvetenskap kommer och hur dina tidigare erfarenheter har påverkat dig.
          </div>
          <form className="upload" method="post" action="/upload/coverLetter" id="coverLetterForm" encType="multipart/form-data">
            <div className="custom-file">
              <input type="file" className="custom-file-input file-input" name="file" id="coverLetter" />
              <label className="custom-file-label">Ladda upp personligt brev</label>
            </div>
          </form>
        </div>
        <div className="row section">
          <h3 className="col-xs-12 col-md-4">
Essäsvar
            <br />
            {' '}
            <label styled="font-size: 16px;">Max 300 ord på vardera</label>
          </h3>
          <div className="col-md-12">
            <p>
                1. Ange två eller tre naturvetenskapliga, tekniska, eller matematiska ämnen du tycker om och berätta varför.
                Du får gärna vara specifik. Vi kommer anpassa ditt forskningsprojekt till de intressen du beskriver i denna fråga.
              {' '}
              <br />
            </p>

              2. Välj och besvara
            {' '}
            <b>en</b>
            {' '}
av nedanstående frågor:
            <ul>
              <li>Berätta om något du gjort som du anser demonstrerar din potential att bli en ledande forskare inom naturvetenskap, teknik och/eller matematik.</li>
              <li> Berätta om något eller någon som inspirerar dig. Hur har det/den/de påverkat dig, dina mål, dina drömmar om framtiden och hur du uppfattar din omgivning?</li>
              <li> Beskriv hur du jobbar/har jobbat för att utveckla någon av dina egenskaper och hur det har hjälpt/hjälper dig?</li>
              <li>
Beskriv ett problem du har löst eller en utmaning du vill lösa. Det kan vara en intellektuell utmaning, en forskningsfråga, ett etiskt dilemma – något som du bryr dig om, oavsett omfattningen. Förklara dess betydelse för dig och
                  vilka utmaningar du ställts/skulle ställas inför och hur du löste/skulle lösa detta problem.
              </li>
            </ul>
            <b>Du ska svara på båda frågor i en och samma pdf.</b>
          </div>
          <form className="upload" method="post" action="/upload/essay" id="essayForm" encType="multipart/form-data">
            <div className="custom-file">
              <input type="file" className="custom-file-input file-input" name="file" id="essay" />
              <label className="custom-file-label">Ladda upp essäsvar ett och två</label>
            </div>
          </form>
        </div>
        <div className="row section">
          <h3 className="col-xs-12 col-md-4">Betyg</h3>
          <div className="col-md-12">
              Scanna in och bifoga slutbetyg för de gymnasiekurser du avslutat. Detta går att få ifrån skolans expedition och ska vara signerat av rektor eller ansvarig lärare.
          </div>
          <form className="upload" method="post" action="/upload/grades" id="gradesForm" encType="multipart/form-data">
            <div className="custom-file">
              <input type="file" className="custom-file-input file-input" name="file" id="grades" />
              <label className="custom-file-label">Ladda upp betyg</label>
            </div>
          </form>
        </div>
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
        <div className="row section">
          <h3 className="col-xs-12 col-md-4">Rekommendationsbrev</h3>
          <div className="col-md-12">
              Rekommendationsbrev från lärare, tränare eller liknande. Exempel på frågor som kan behandlas i en rekommendation är hur eleven hanterar utmaningar och ansvar, och varför eleven har potential att bli en framtida ledare inom
              forskning.
              Rekommendationsbrev skall komponeras, signeras och skickas av läraren, tränaren eller liknande.
            {' '}
            <a href="https://raysforexcellence.se/rekommendationsbev" target="_blank" styled="text-decoration: none">Mer info hittas här.</a>

            <p>
              <br />
                Genom att skriva in en e-post nedan kommer en länk att skickas till mottagaren som kan ladda upp sitt rekommendationsbrev.
                Du kommer att kunna skicka om och ändra emailet så länge mottagaren inte har laddat upp sitt brev.
                Så fort mottagaren har laddat upp brevet är den låst till din ansökan.
            </p>
            <p><b>Du bör helst skicka in minst 1 och max 3 rekommendationsbrev.</b></p>
            <div className="recommendation-senders">
              <form method="post" action="/recommendation" className="row input-group">
                <div className="col-md-6">
                  <input value="<%= email.email %>" name="email" type="text" className="form-control" placeholder="E-mail" aria-label="" required />
                </div>
                <div className="col-md-3" styled="<%=style%>">
                  <span className="input-group-text" styled="<%=style%>" />
                </div>
                <div className="col-md-3" />
              </form>
            </div>
          </div>
          <div className="alert alert-success" role="alert" styled="margin: 0 auto; width: 95%">
              Din ansökan är fullständig och är mottagen för Rays
          </div>
          <form className="buttons">
            <div className="btn-group" role="group">
              <button type="submit" formAction="/logout" formMethod="post" type="button" className="btn btn-secondary">Logga ut</button>
              <button type="submit" formAction="/delete" formMethod="post" type="button" className="btn btn-danger" id="confirm">Radera konto</button>
            </div>
            <div className="btn-group" role="group">
              <button type="submit" formAction="/download" formMethod="post" type="button" className="btn btn-primary">Ladda ned din ansökan</button>
            </div>
          </form>
        </div>
      </div>
    </StyledPlate>
  </Center>
);
