<template>
    <section class="vh-100 gradient-custom">
        <div class="container h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100"
            >
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div
                                    class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                                >
                                    <p
                                        class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                                    >
                                        Sign up
                                    </p>
                                    <form @submit.prevent="register">
                                        <form class="mx-1 mx-md-4">
                                            <div
                                                class="d-flex flex-row align-items-center mb-4"
                                            >
                                                <i
                                                    class="fas fa-user fa-lg me-3 fa-fw"
                                                ></i>
                                                <div
                                                    class="form-outline flex-fill mb-0"
                                                >
                                                    <label
                                                        class="form-label"
                                                        for="name"
                                                        >Your Name</label
                                                    >
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        class="form-control"
                                                        v-model="user.name"
                                                    />
                                                    <div
                                                        v-if="errors.name"
                                                        class="mt-2 alert alert-danger"
                                                    >
                                                        {{ errors.name[0] }}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                class="d-flex flex-row align-items-center mb-4"
                                            >
                                                <i
                                                    class="fas fa-envelope fa-lg me-3 fa-fw"
                                                ></i>
                                                <div
                                                    class="form-outline flex-fill mb-0"
                                                >
                                                    <label
                                                        class="form-label"
                                                        for="email"
                                                        >Your Email</label
                                                    >
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        class="form-control"
                                                        v-model="user.email"
                                                    />
                                                    <div
                                                        v-if="errors.email"
                                                        class="mt-2 alert alert-danger"
                                                    >
                                                        {{ errors.email[0] }}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                class="d-flex flex-row align-items-center mb-4"
                                            >
                                                <i
                                                    class="fas fa-lock fa-lg me-3 fa-fw"
                                                ></i>
                                                <div
                                                    class="form-outline flex-fill mb-0"
                                                >
                                                    <label
                                                        class="form-label"
                                                        for="password"
                                                        >Password</label
                                                    >
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        class="form-control"
                                                        v-model="user.password"
                                                    />
                                                    <div
                                                        v-if="errors.password"
                                                        class="mt-2 alert alert-danger"
                                                    >
                                                        {{ errors.password[0] }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                                            >
                                                <button
                                                    type="submit"
                                                    class="btn btn-primary btn-lg"
                                                    @click="register()"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            <div>
                                                <p class="mb-0">
                                                    Back to >>>
                                                    <router-link
                                                        :to="{ name: 'login' }"
                                                        class="text-black-50 fw-bold"
                                                        >Login</router-link
                                                    >
                                                </p>
                                            </div>
                                        </form>
                                    </form>
                                </div>
                                <div
                                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                                >
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid"
                                        alt="Sample image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "registerPage",

    data: () => ({
        user: {
            name: "",
            email: "",
            password: "",
        },
        errors: {},
    }),

    methods: {
        register() {
            axios
                .post("http://127.0.0.1:8000/api/" + "register", this.user, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    this.$router.push({
                        name: "login",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.errors = err.response.data.errors || {};
                });
        },
    },
};
</script>
<style>
.gradient-custom {
    background: #00416a;

    background: -webkit-linear-gradient(
        to right,
        rgba(0, 65, 106),
        rgba(106, 147, 203)
    );

    background: linear-gradient(
        to right,
        rgba(0, 65, 106),
        rgba(106, 147, 203)
    );
}
</style>
