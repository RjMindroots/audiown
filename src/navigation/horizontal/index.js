// ** Navigation sections imports
import dashboardMenu from './dashboardMenu'
import artistroutes from './artistMenu'
import projectsMenu from './projectsMenu'
// ** Merge & Export
export default [
    ...dashboardMenu, 
    ...artistroutes,
    ...projectsMenu
]