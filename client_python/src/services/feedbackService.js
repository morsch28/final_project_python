import Swal from "sweetalert2"

function showAlert({title,text,icon,showConfirmButton,timer}){
    return Swal.fire({
        title,
        text,
        icon,
        showConfirmButton,
        timer

    })
}

function showConfirm({text,confirmButtonText="yes",cancelButtonText="no"}){
    return Swal.fire({
        text,
        icon:"warning",
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText
    })
}

export default {
    showAlert,
    showConfirm
}
