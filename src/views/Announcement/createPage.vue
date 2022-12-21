<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH ANNOUNCEMENT</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Headline</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="announcement.headline"
                                    placeholder="Masukkan headline"
                                />
                                <!-- validation -->
                                <div
                                    v-if="validation.headline"
                                    class="mt-2 alert alert-danger"
                                >
                                    {{ validation.headline[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label"
                                    >Isi</label
                                >
                                <input
                                    class="form-control"
                                    v-model="announcement.isi"
                                    placeholder="Masukkan isi"
                                />
                                <!-- validation -->
                                <div
                                    v-if="validation.isi"
                                    class="mt-2 alert alert-danger"
                                >
                                    {{ validation.isi[0] }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">
                                SIMPAN
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { inject } from "vue";
export default {
    setup() {
        const toast = inject("toast");
        //state departemen
        const announcement = reactive({
            headline: "",
            isi: "",
        });
        //state validation
        const validation = ref([]);
        //vue router
        const router = useRouter();
        //method store
        function store() {
            let headline = announcement.headline;
            let isi = announcement.isi;
            axios
                .post("http://localhost:8000/api/announcement", {
                    headline: headline,
                    isi: isi,
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "announcement.index",
                    });
                    toast.show("Berhasil tambah", {
                        type: "success",
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }
        //return
        return {
            announcement,
            validation,
            router,
            store,
        };
    },
};
</script>
<style></style>
