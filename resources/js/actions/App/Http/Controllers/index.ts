import Api from './Api'
import MediaController from './MediaController'
import Web from './Web'
import Settings from './Settings'
const Controllers = {
    Api: Object.assign(Api, Api),
MediaController: Object.assign(MediaController, MediaController),
Web: Object.assign(Web, Web),
Settings: Object.assign(Settings, Settings),
}

export default Controllers