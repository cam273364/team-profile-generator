const index = require('./index.js')

describe ("Test index.js", () => {
    it("Should generate an html file", () => {
        const teamManager = 'Frank Abignale'
        const managerEmployeeId = '69'
        const managerEmailAddress = 'frank@email.com'
        const managerOfficeNumber = '420'
        const interns = []
        const engineers = []


        const resultHtml = index.generateHtmL(
            teamManager,
            managerEmployeeId,
            managerEmailAddress,
            managerOfficeNumber,
            interns,
            engineers
        );
        
        const expectedHtml = `<!DOCTYPE html><html><head></head><body>Team Manager: wright Manager Employee Number: 69 Manager Email Address:<a href=mailto:wright@weedistight.com>wright@weedistight.com</a> Manager Office Number: 420  </body></html>`
        expect (resultHtml).toEqual(expectedHtml)
        
        
    });

   
});