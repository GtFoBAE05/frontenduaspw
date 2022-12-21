<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT POST</h4>
                        <hr />

                        <form @submit.prevent="update(this.$route.params.id)">
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
                                    >isi pengumuman</label
                                >
                                <input
                                    class="form-control"
                                    v-model="announcement.isi"
                                    placeholder="Masukkan isi pengumuman"
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
                            <!-- <button type="submit" class="btn btn-primary">
                                <router-link
                                    :to="{
                                        name: 'departemen.index',
                                    }"
                                    class="btn btn-sm btn-primary mr-1"
                                    >SIMPAN</router-link
                                >
                            </button> -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted } from "vue";
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
        const router = useRoute();
        const id = router.params.id;
        console.log(id);
        //method get
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get(`http://localhost:8000/api/announcement/` + id, {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    announcement.headline = response.data.data.headline;
                    announcement.isi = response.data.data.isi;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        //method store
        function update(id) {
            let headline = announcement.headline;
            let isi = announcement.isi;
            axios
                .put(`http://localhost:8000/api/announcement/` + id, {
                    headline: headline,
                    isi: isi,
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then(() => {
                    //redirect ke post index
                    router.push({ name: "announcement.index" });
                    toast.show("Berhasil update", {
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
            id,
            validation,
            router,
            update,
        };
    },
    data() {},
};
</script>
<style></style>
