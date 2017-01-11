// import Router from 'vue-router'
// import App from './App.vue'
// import IndexView from './model/index/indexView.vue'
// import PlantformView from './model/plantform/plantformView.vue'
// import PlantformCollectionView from './model/plantform/plantformCollectionView.vue'
// import PlantformRecordView from './model/plantform/plantformRecordView.vue'
// import MonitorView from './model/monitor/monitorView.vue'
// import BaselibView from './model/baselib/baselibView.vue'
// import ValuelibView from './model/valuelib/valuelibView.vue'
// import JudgeView from './model/judge/judgeView.vue'
// import ChartsView from './model/charts/chartsView.vue'
// import SettingsView from './model/settings/settingsView.vue'
// import RelationsView from './model/relations/relationsView.vue'
var Router = require('vue-router')
var App = require('./App.vue')
var LoginView = require('./model/login/loginView.vue')
var IndexView = require('./model/index/indexView.vue')
var PlantformView = require('./model/plantform/plantformView.vue')
var PlantformCollectionView = require('./model/plantform/plantformCollectionView.vue')
var PlantformRecordView = require('./model/plantform/plantformRecordView.vue')
var PlantformUploadCollection = require('./model/plantform/uploadCollection.vue')
var PlantformFaceCollection = require('./model/plantform/faceCollection.vue')
var PlantformBodyCollection = require('./model/plantform/bodyCollection.vue')
var PlantformCarCollection = require('./model/plantform/carCollection.vue')
var PlantformFaceAlarmCollection = require('./model/plantform/faceAlarmCollection.vue')
var PlantformCarAlarmCollection = require('./model/plantform/carAlarmCollection.vue')
var MonitorView = require('./model/monitor/monitorView.vue')
var BaselibView = require('./model/baselib/baselibView.vue')
var ValuelibView = require('./model/valuelib/valuelibView.vue')
var JudgeView = require('./model/judge/judgeView.vue')
var ChartsView = require('./model/charts/chartsView.vue')
var baseResourceView = require('./model/charts/baseResourceView.vue')
var baseNewResourceView = require('./model/charts/baseNewResourceView.vue')
var SettingsView = require('./model/settings/settingsView.vue')
var SettingsDevicemgrView = require('./model/settings/settingsDevicemgrView.vue')
var SettingsLibrarymgrView = require('./model/settings/settingsLibrarymgrView.vue') //库管理
var realTimeStructView = require('./model/settings/realTimeStructView.vue') //实施结构化
var functionBlockConfigView = require('./model/settings/functionBlockConfigView.vue') //功能配置
var settingsServiceView = require('./model/settings/settingsServiceView.vue') //服务管理
var settingsCarMonitormgrView = require('./model/settings/settingsCarMonitormgrView.vue') //车辆布控
var settingsTaskCemgrView = require('./model/settings/settingsTaskmgrView.vue')
var RelationsView = require('./model/relations/relationsView.vue')
var MonitorMapView = require('./model/monitor/monitorMapView.vue')
var MonitorPlantformView = require('./model/monitor/monitorplantformView.vue')
var settingsHandleLograrymgrView = require('./model/settings/settingsHandleLograrymgrView.vue')

// routing
var router = new Router()

router.map({
    '/login': {
        name: 'login',
        component: LoginView
    },
    '/index': {
        name: 'index',
        component: IndexView,
    },
    '/plantform': {
        name: 'plantform',
        component: PlantformView,
        subRoutes: {
            '/collection': {
                name: 'collection',
                component: PlantformCollectionView,
                subRoutes: {
                    '/uploadcollection': {
                        name: 'uploadcollection',
                        component: PlantformUploadCollection
                    },
                     '/facecollection': {
                        name: 'facecollection',
                        component: PlantformFaceCollection
                    },
                     '/bodycollection': {
                        name: 'bodycollection',
                        component: PlantformBodyCollection
                    },
                    '/carcollection': {
                        name: 'carcollection',
                        component: PlantformCarCollection
                    },
                     '/facealarmcollection': {
                        name: 'facealarmcollection',
                        component: PlantformFaceAlarmCollection
                    },
                    '/caralarmcollection': {
                        name: 'caralarmcollection',
                        component: PlantformCarAlarmCollection
                    }
                }
            },
            '/': {
                name: 'record',
                component: PlantformRecordView
            }
        }
    },
    '/monitor': {
        name: 'monitor',
        component: MonitorView,
        subRoutes: {
            '/': {
                name: 'monitorMap',
                component: MonitorMapView
            },
            '/plantform': {
                name: 'monitorPlantform',
                component: MonitorPlantformView
            }
        }
    },
    '/baselib': {
        name: 'baselib',
        component: BaselibView,
        subRoutes: {
            '/': {
                name: 'baseLibAll',
                component: AllView
            },
            '/face': {
                name: 'baseLibFace',
                component: FaceView
            },
            '/body': {
                name: 'baseLibBody',
                component: BodyView
            },
            '/car': {
                name: 'baseLibCar',
                component: CarView
            },
            '/alarm': {
                name: 'baseLibAlarm',
                component: AlarmView
            },
            '/useruploadview': {
                name: 'userUploadView',
                component: userUploadView
            },
            '/wifi': {
                name: 'baseLibWifi',
                component: WifiView
            },
            '/eplate': {
                name: 'baseLibEplate',
                component: EplateView
            },
            '/search': {
                name: 'baseLibSearch',
                component: SearchView
            }
        }
    },
    '/valuelib': {
        name: 'valuelib',
        component: ValuelibView
    },
    '/judge': {
        name: 'judge',
        component: JudgeView,
        subRoutes: {
            '/facecollision': {
                name: 'JudgeFaceCollision',
                component: JudgeFaceCollisionView
            },
            '/faceroute': {
                name: 'JudgeFaceRouteView',
                component: JudgeFaceRouteView
            },
            '/faceFrequency': {
                name: 'JudgeFaceFrequencyView',
                component: JudgeFaceFrequencyView
            },
            '/faceTrace': {
                name: 'JudgeFaceTraceView',
                component: JudgeFaceTraceView
            },
            '/faceaccompany': {
                name: 'faceaccompany',
                component: judgeFaceAccompanyView
            },
            '/': {
                name: 'judge',
                component: JudgeView
            }
        }
    },
    '/charts': {
        name: 'charts',
        component: ChartsView,
        subRoutes: {
            '/': {
                name: 'baseResource',
                component: baseResourceView
            },
            '/baseNewResource': {
                name: 'baseNewResource',
                component: baseNewResourceView
            }
        }
    },
    '/settings/:navIndex': {
        name: 'settings',
        component: SettingsView,
        subRoutes: {
            '/': {
                name: 'devicemgr',
                component: SettingsDevicemgrView
            },
            '/librarymgr': {
                name: 'librarymgr',
                component: SettingsLibrarymgrView
            },
            '/realTimemgr': {
                name: 'realTimemgr',
                component: realTimeStructView
            },
            '/servermgr': {
                name: 'servermgr',
                component: settingsServiceView
            },
            '/taskmgr': {
                name: 'taskmgr',
                component: settingsTaskCemgrView
            },
            '/functionConfig': {
                name: 'functionConfig',
                component: functionBlockConfigView
            },
            'handleLogmgr': {
                name: 'handleLogmgr',
                component: settingsHandleLograrymgrView
            },
            '/vehicletaskmgr': {
                name: 'vehicletaskmgr',
                component: settingsCarMonitormgrView
            }
        }
    },
    '/relations': {
        name: 'relations',
        component: RelationsView,
        subRoutes: {
            '/': {
                name: 'macLinkFace',
                component: macLinkFaceView
            },
            '/faceLinkMac': {
                name: 'faceLinkMac',
                component: faceLinkMacView
            }
        }
    }
})
router.beforeEach(function() {
        window.scrollTo(0, 0)
    })
    // 重定向任意未匹配路径到 /index
// router.redirect({
//     '*': '/index'
// })
router.go("/index")
router.start(App, '#app')
