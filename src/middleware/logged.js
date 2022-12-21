export default function logged(to, from, next) {
    if (localStorage.getItem("token")) next({ name: "beranda" });
    next();
}
