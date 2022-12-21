import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("@/views/Auth/loginView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Auth/registerView.vue"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/indexPage.vue"),
    },

    {
        path: "/dashboard",
        name: "beranda",
        component: () => import("@/views/dashboard/indexPage.vue"),
        children: [
            {
                path: "/announcement",
                name: "announcement.index",
                component: () => import("@/views/Announcement/indexPage.vue"),
            },
            {
                path: "/announcement/create",
                name: "announcement.create",
                component: () => import("@/views/Announcement/createPage.vue"),
            },
            {
                path: "/announcement/edit",
                name: "announcement.edit",
                component: () => import("@/views/Announcement/editPage.vue"),
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
