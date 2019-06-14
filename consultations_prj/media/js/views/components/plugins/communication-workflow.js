define([
    'knockout',
    'viewmodels/workflow',
    'viewmodels/workflow-step',
    'views/components/workflows/new-tile-step',
    'views/components/workflows/set-tile-value',
    'views/components/workflows/get-tile-value'
], function(ko, Workflow, Step) {
    return ko.components.register('communication-workflow', {
        viewModel: function(params) {
            var self = this;
            params.steps = [
                {
                    title: 'Communication Details',
                    description: 'Date, Subject, and Type of Communication',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '97b30d4c-6c4a-11e9-853f-dca90488358a',
                    nodegroupid: '395a96a3-6c4b-11e9-b7d9-dca90488358a',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    icon: 'fa-tag'
                },
                {
                    title: 'Attendees',
                    name: 'setname',
                    description: 'Attendee List',
                    component: 'views/components/workflows/set-tile-value',
                    componentname: 'set-tile-value',
                    graphid: '97b30d4c-6c4a-11e9-853f-dca90488358a',
                    nodegroupid: 'fcb84b0f-6d1e-11e9-881a-dca90488358a',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    icon: 'fa-user-plus'
                },
                {
                    title: 'Notes',
                    description: ' Meeting notes',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '97b30d4c-6c4a-11e9-853f-dca90488358a',
                    nodegroupid: '6fda4838-6d1e-11e9-b3d5-dca90488358a',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    icon: 'fa-lightbulb-o'
                },
                {
                    title: 'Follow-On Actions',
                    description: 'Follow-on actions, To-Dos',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '97b30d4c-6c4a-11e9-853f-dca90488358a',
                    nodegroupid: '8b171540-6d1e-11e9-ac56-dca90488358a',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    icon: 'fa-clipboard'
                },
                {
                    title: 'Upload Documents',
                    description: 'Document Upload',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '97b30d4c-6c4a-11e9-853f-dca90488358a',
                    nodegroupid: '70fd3940-6d1f-11e9-87dd-dca90488358a',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    icon: 'fa-camera'
                },
                {
                    title: 'Communication Workflow Complete',
                    description: 'Choose and option below',
                    component: 'views/components/workflows/final-step',
                    componentname: 'final-step',
                    graphid:  '97b30d4c-6c4a-11e9-853f-dca90488358a',
                    icon: 'fa-check',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null
                }
            ];

            Workflow.apply(this, [params]);

            this.updateState = function(activeStep) {
                var previousStep = self.previousStep();
                if (previousStep) {
                    self.state.steps[ko.unwrap(previousStep.name)] = previousStep.stateProperties();
                    self.state.activestep = activeStep._index;
                    self.state.previousstep = previousStep._index;
                    self.updateUrl();
                }
                self.previousStep(activeStep);
            };

            self.activeStep.subscribe(this.updateState);

            self.ready(true);
        },
        template: { require: 'text!templates/views/components/plugins/communication-workflow.htm' }
    });
});
