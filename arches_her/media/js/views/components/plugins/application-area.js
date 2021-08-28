define([
    'knockout',
    'arches',
    'viewmodels/workflow',
    'viewmodels/workflow-step',
    'views/components/workflows/new-tile-step',
    'views/components/workflows/application-area/app-area-address-step',
    'views/components/workflows/application-area/app-area-final-step'
], function(ko, arches, Workflow, Step) {
    return ko.components.register('application-area', {
        viewModel: function(params) {
            var self = this;
            this.resourceId = ko.observable();

            params.steps = [
                {
                    title: 'Assign Address',
                    name: 'assign-address',
                    description: 'Assign an address to your application area. Use the address as the default name',
                    component: 'views/components/workflows/component-based-step',
                    componentname: 'component-based-step',
                    graphid: '42ce82f6-83bf-11ea-b1e8-f875a44e0e11',
                    nodegroupid: 'c7ec6efa-28c8-11eb-9ed1-f875a44e0e11',
                    targetnodegroup: '9c9f9dbb-83bf-11ea-bca7-f875a44e0e11',
                    targetnode: '9c9f9dc0-83bf-11ea-8d22-f875a44e0e11',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    required: true,
                    icon: 'fa-envelope',
                    nameheading: 'Application Area Name',
                    namelabel: 'Make the Area Name the same as the Area Address',
                    shouldtrackresource: true,
                    informationboxdata: {
                        heading: 'Assign an address',
                        text: 'Assign an address to your application area. Use the address as the default name',
                    },
                    layoutSections: [
                        {
                            sectionTitle: null,
                            componentConfigs: [
                                { 
                                    componentName: 'app-area-address-step',
                                    uniqueInstanceName: 'app-area-address', /* unique to step */
                                    parameters: {
                                        renderContext: 'workflow',
                                    },
                                    required: true,
                                },
                            ], 
                        },
                    ],
                    wastebin: {resourceid: null, description: 'an application area instance'}
                },
                {
                    title: 'Area Map',
                    name: 'area-map',
                    description: 'Draw (or select from the Development Area Overlay) the extent of...',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '42ce82f6-83bf-11ea-b1e8-f875a44e0e11',
                    nodegroupid: '19096dc5-3a3b-11eb-b4cf-f875a44e0e11',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    required: true,
                    icon: 'fa-map-marker',
                    informationboxdata: {
                        heading: 'Application Area Map',
                        text: 'Draw (or select from the development area overlay) the extent of the area',
                    }
                },
                {
                    title: 'Related Heritage Resources',
                    name: 'related-heritage-resource',
                    description: 'Select the other Heritage Sites or Artifacts related to the current Consulation',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '42ce82f6-83bf-11ea-b1e8-f875a44e0e11',
                    nodegroupid: 'a93c73b4-83d4-11ea-80e6-f875a44e0e11',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    required: false,
                    icon: 'fa-bank',
                    informationboxdata: {
                        heading: 'Related Heritage Resources',
                        text: 'Select the other heritage sites or artifacts related to the current Consulation',
                    }
                },
                {
                    title: 'Area Description',
                    name: 'area-description',
                    description: 'Describe the Application Area',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '42ce82f6-83bf-11ea-b1e8-f875a44e0e11',
                    nodegroupid: '7a76715d-94fd-11ea-8481-f875a44e0e11',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    required: false,
                    icon: 'fa-clipboard',
                    informationboxdata: {
                        heading: 'Area Description',
                        text: 'Describe the application area',
                    }
                },
                {
                    title: 'Area Designations',
                    name: 'area-designations',
                    description: 'Select the Application Area designations',
                    component: 'views/components/workflows/new-tile-step',
                    componentname: 'new-tile-step',
                    graphid: '42ce82f6-83bf-11ea-b1e8-f875a44e0e11',
                    nodegroupid: '48f51523-efde-11eb-8285-a87eeabdefba',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    required: false,
                    icon: 'fa-bookmark',
                    informationboxdata: {
                        heading: 'Area Designations',
                        text: 'Select the application Area designations',
                    }
                },
                {
                    title: 'Application Area Complete',
                    name: 'application-area-complete',
                    description: 'Choose an option below',
                    component: 'views/components/workflows/component-based-step',
                    componentname: 'component-based-step',
                    layoutSections: [
                        {
                            componentConfigs: [
                                { 
                                    componentName: 'app-area-final-step',
                                    uniqueInstanceName: 'app-area-final', /* unique to step */
                                    tilesManaged: 'none',
                                    parameters: {},
                                },
                            ], 
                        },
                    ],
                    graphid: '42ce82f6-83bf-11ea-b1e8-f875a44e0e11',
                    icon: 'fa-check',
                    resourceid: null,
                    tileid: null,
                    parenttileid: null,
                    informationboxdata: {
                        heading: 'Workflow Complete: Review your work',
                        text: 'Please review the summary information. You can go back to a previous step to make changes or "Quit Workflow" to discard your changes and start over',
                    }
                }
            ];

            Workflow.apply(this, [params]);
            this.quitUrl = "/arches-her" + arches.urls.plugin('init-workflow');
            self.getJSON('application-area');
            
            self.ready(true);
        },
        template: { require: 'text!templates/views/components/plugins/application-area.htm' }
    });
});
