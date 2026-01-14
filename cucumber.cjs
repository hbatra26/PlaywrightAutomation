module.exports = {
    default: {
        timeout: 60000,
        parallel: 2,
        require: ['Features/settings/hooks.js', 'Features/StepDefinition/Steps.js'],
        format: ['pretty', 'html:Reports/cucumber-report.html'],
        publishQuiet: true,
        retry: 1

    }
};
