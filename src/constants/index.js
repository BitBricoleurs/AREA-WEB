export const cardServicesStyles = {
    'Jenkins': {
        backgroundColor: 'bg-red-600',
        borderColor: 'border-red-600',
        textColor: 'text-red-600',
        hoverBackColor: 'hover:bg-red-600',
        strokeColor: 'stroke-red-600',
        iconPath: '/src/assets/icons/jenkinsIcon.svg'
    },
    'Github': {
        backgroundColor: 'bg-white',
        borderColor: 'border-white',
        textColor: 'text-white',
        hoverBackColor: 'hover:bg-white',
        strokeColor: 'stroke-white',
        iconPath: '/src/assets/icons/githubIcon.svg'
    },
    'Jira': {
        backgroundColor: 'bg-blue-800',
        borderColor: 'border-blue-800',
        textColor: 'text-blue-800',
        hoverBackColor: 'hover:bg-blue-800',
        strokeColor: 'stroke-blue-800',
        iconPath: '/src/assets/icons/jiraIcon.svg'
    },
    'Teams': {
        backgroundColor: 'bg-blue-600',
        borderColor: 'border-blue-600',
        textColor: 'text-blue-600',
        hoverBackColor: 'hover:bg-blue-600',
        strokeColor: 'stroke-blue-600',
        iconPath: '/src/assets/icons/teamsIcon.svg'
    },
    'Outlook': {
        backgroundColor: 'bg-blue-300',
        borderColor: 'border-blue-300',
        textColor: 'text-blue-300',
        hoverBackColor: 'hover:bg-blue-300',
        strokeColor: 'stroke-blue-300',
        iconPath: '/src/assets/icons/outlookIcon.svg'
    },
    'Openai' : {
        backgroundColor: 'bg-green-700',
        borderColor: 'border-green-700',
        textColor: 'text-green-700',
        hoverBackColor: 'hover:bg-green-700',
        strokeColor: 'stroke-green-700',
        iconPath: '/src/assets/icons/openaiIcon.svg'
    },
    'Azure' : {
        backgroundColor: 'bg-blue-700',
        borderColor: 'border-blue-700',
        textColor: 'text-blue-700',
        hoverBackColor: 'hover:bg-blue-700',
        strokeColor: 'stroke-blue-700',
        iconPath: '/src/assets/icons/azureIcon.svg'
    },
    'System': {
        backgroundColor: 'bg-vertical-purple-gradient',
        borderColor: 'border-light-purple',
        textColor: 'text-light-purple',
        hoverBackColor: 'hover:bg-light-purple',
        strokeColor: 'stroke-light-purple',
        iconPath: '/src/assets/icons/purpleLogo.svg'
    },
    'default': {
        backgroundColor: 'bg-contrast-box-color',
        borderColor: 'border-contrast-box-color',
        textColor: 'text-contrast-box-color',
        hoverBackColor: 'hover:bg-contrast-box-color',
        iconPath: '/src/assets/icons/purpleLogo.svg'
    }
};

export const triggersConstant = [
    {
        serviceName: "System",
        description: "Date & Time",
    },
    {
        serviceName: "Outlook",
        description: "Email",
    },
    {
        serviceName: "Outlook",
        description: "Calendar",
    },
    {
        serviceName: "Teams",
        description: "Message",
    },
    {
        serviceName: "Teams",
        description: "Mention",
    },
    {
        serviceName: "Jira",
        description: "Ticket",
    },
    {
        serviceName: "Github",
        description: "Commit",
    },
    {
        serviceName: "Github",
        description: "Pull Request",
    },
    {
        serviceName: "Github",
        description: "Issue",
    },
    {
        serviceName: "Github",
        description: "Star",
    },
    {
        serviceName: "Jenkins",
        description: "Build",
    },
    {
        serviceName: "Jenkins",
        description: "Server status",
    },
    {
        serviceName: "Azure",
        description: "Health",
    },
];

export const actions = [
    {
        serviceName: "System",
        description: "Notification",
    },
    {
        serviceName: "Outlook",
        description: "Email",
    },
    {
        serviceName: "Outlook",
        description: "Calendar",
    },
    {
        serviceName: "Openai",
        description: "Generate",
    },
];