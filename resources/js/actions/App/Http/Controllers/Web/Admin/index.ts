import AdminPanelController from './AdminPanelController'
import AdminContentController from './AdminContentController'
const Admin = {
    AdminPanelController: Object.assign(AdminPanelController, AdminPanelController),
AdminContentController: Object.assign(AdminContentController, AdminContentController),
}

export default Admin