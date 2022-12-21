<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link
                            :to="{ name: 'announcement.create' }"
                            class="btn btn-md btn-success"
                            >TAMBAH ANNOUNCEMENT</router-link
                        >
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">HEADLINE</th>
                                    <th scope="col">ISI</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(announcement, id) in announcements"
                                    :key="id"
                                >
                                    <td>{{ announcement.headline }}</td>
                                    <td>{{ announcement.isi }}</td>
                                    <td>
                                        <router-link
                                            :to="{
                                                name: 'announcement.edit',
                                                params: { id: announcement.id },
                                            }"
                                            class="btn btn-sm btn-primary mr-1"
                                        >
                                            EDIT</router-link
                                        >
                                        <button
                                            class="btn btn-sm btn-danger ml-1"
                                            @click="
                                                deleteAnnouncement(
                                                    announcement.id
                                                )
                                            "
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 
    'departemen.edit', params: { id: departemen.id } }" class="btn 
    btn-sm btn-primary mr-1">
    EDIT</router-link>
    <button class="btn btn-sm btn-danger ml-1">DELETE</button> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { inject } from "vue";

export default {
    setup() {
        const toast = inject("toast");
        //reactive state
        let announcements = ref([]);
        //vue router
        const router = useRouter();
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/announcement", {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    //assign state posts with response data
                    announcements.value = response.data.data;
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "announcement.index",
                    });
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });
        //
        function deleteAnnouncement(id) {
            axios
                .delete("http://localhost:8000/api/announcement/" + id)
                .then(() => {
                    //redirect ke post index
                    window.location.reload();
                    toast.show("Berhasil hapus", {
                        type: "success",
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    console.log(error.response.data);
                });
        }
        //return
        return {
            announcements,
            router,
            deleteAnnouncement,
        };
    },
};
</script>
<style></style>
