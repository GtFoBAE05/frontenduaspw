<template>
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100"
            >
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card text-black" style="border-radius: 1rem">
                        <div class="card-body p-5 text-center">
                            <div class="mb-md-5 mt-md-4 pb-5">
                                <h2 class="fw-bold mb-2 text-uppercase">
                                    Login
                                </h2>
                                <p class="text-black-50 mb-5">
                                    Please enter your email and password!
                                </p>

                                <div class="form-outline form-white mb-4">
                                    <label class="form-label" for="Email"
                                        >Email</label
                                    >
                                    <input
                                        type="email"
                                        id="Email"
                                        class="form-control form-control-lg"
                                        v-model="user.email"
                                    />
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <label class="form-label" for="Password"
                                        >Password</label
                                    >
                                    <input
                                        type="password"
                                        id="Password"
                                        class="form-control form-control-lg"
                                        v-model="user.password"
                                    />
                                </div>
                                <button
                                    class="btn btn-primary btn-lg px-5"
                                    @click="login()"
                                >
                                    Login
                                </button>
                            </div>
                            <div>
                                <p class="mb-0">
                                    Don't have an account?
                                    <router-link
                                        :to="{ name: 'register' }"
                                        class="text-black-50 fw-bold"
                                        >Sign Up</router-link
                                    >
                                </p>
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
    name: "loginPage",

    data: () => ({
        user: {
            email: "",
            password: "",
        },
        errors: {},
    }),

    methods: {
        login() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/" + "login",
                    JSON.stringify(this.user),
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    this.$router.push("/dashboard");
                })
                .catch((err) => {
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
