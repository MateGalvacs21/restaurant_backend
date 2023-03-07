const { ConfigurationService } = require('../../services/configuration/configuration.service');

(function (){
    mockConfigurationService();
})();

function mockConfigurationService() {
    jest.spyOn(ConfigurationService, 'ConnectionData','get').mockReturnValue({connStr:'mongo-conn', dbName:'db-name'});
    jest.spyOn(ConfigurationService, 'ServerPort','get').mockReturnValue(5500);
}

