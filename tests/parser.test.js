var useragent = require('../')
  , should = require('should');

// use a fixed user agent to ensure proper test results each time
var ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.24 Safari/535.2";

// make sure we have proper stack traces for when things fail
require('long-stack-traces');

// the actual tests
module.exports = {
  'semver compatible version number': function () {
    useragent.version.should.match(/^\d+\.\d+\.\d+$/);
  },

  'parser should not throw errors and default to unkown': function () {
    var agent = useragent.parse('');

    agent.family.should.equal('Other');
    agent.major.should.equal('0');
    agent.minor.should.equal('0');
    agent.patch.should.equal('0');

    agent.os.should.equal('Other');
    agent.toVersion().should.equal('');
    agent.toString().should.equal('Other');
    agent.toJSON().should.equal('{"family":"Other","major":0,"minor":0,"patch":0,"os":"Other"}');
  },

 'correctly parse chromes user agent': function () {
  var agent = useragent.parse(ua);

  agent.family.should.equal('Chrome');
  agent.major.should.equal('15');
  agent.minor.should.equal('0');
  agent.patch.should.equal('874');

  agent.os.should.equal('Mac OS X');
  agent.toVersion().should.equal('15.0.874');
  agent.toString().should.equal('Chrome 15.0.874 / Mac OS X');
  agent.toAgent().should.equal('Chrome 15.0.874');
  agent.toJSON().should.equal('{"family":"Chrome","major":"15","minor":"0","patch":"874","os":"Mac OS X"}');
 }
}
