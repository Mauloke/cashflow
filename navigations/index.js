export const MainScreen = {
    root: {
        sideMenu: {
            id: "sideMenu",
            left: {
              component:{
                    name: 'GROW.SideDrawer',
                    id:'sideDrawer'
                }
            },
            center: {
                stack:{
                    id: 'CenterScreen',
                    options:{
                        topBar: {
                        visible:false,
                        }
                    },
                    children:[{
                        component: {
                            name: 'GROW.TransactionScreen',
                            id: 'TransactionScreen',
                        }
                    }]
                            
                }
            }
        },
    }
}

export const WelcomeScreen = {
    root: {
        component: {
            name: 'GROW.WelcomeScreen',
            id: 'WelcomeScreen',
        }
    }
}

export const AuthRoot = {
    root: {
      component: {
        name: 'GROW.AuthScreen',
        id: 'AuthScreen'
      }
    }
}