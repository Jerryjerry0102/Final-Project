 // image upload
 function readImage(input) {

     if (input.files && input.files[0]) {
         // 이미지 파일인지 검사 (생략)
         // FileReader 인스턴스 생성
         const reader = new FileReader()
             // 이미지가 로드가 된 경우
         reader.onload = e => {
                 const previewImage = document.getElementById("img")
                 previewImage.src = e.target.result
             }
             // reader가 이미지 읽도록 하기
         reader.readAsDataURL(input.files[0])
     }
 }
 // input file에 change 이벤트 부여
 const imgUpload = document.getElementById("chooseFile")
 imgUpload.addEventListener("change", e => {
     readImage(e.target)
 });

 function edit() {

     var form = document.getElementById("form");
     if (!form.checkValidity()) {
         form.reportValidity();

         return false;
     }


     axios({
             method: 'post',
             url: 'http://localhost:8000/user/profile/edit',
             data: user = {
                 email: form.id.value,
                 pw: form.pw.value,
                 name: form.name.value
             }
         }).then((rep) => {
             return rep.data;
         })
         .then((data) => {
             alert("수정 성공");
         }).catch((error) => {
             Swal.fire({
                 icon: "error",
                 title: "정보수정 실패",
                 text: "모든 칸을 정확히 입력하세요.",
             });
         });


 }

 function imgChange() {
     $(".image").hide();
     $(".message").hide();
     $("#img").show();
     ////////////////////////////////////////////////////////////////////////////////////
     const formData = new FormData();
     const file = document.getElementById("chooseFile");
     formData.append("myImage", file.files[0]);
     axios({
         headers: {
             "Content-Type": "multipart/form-data",
         },
         method: "post",
         url: "http://localhost:8000/user/mypage/edit",
         data: formData,

     }).then((rep) => {
         return true;
     }).then((data) => {

     }).catch((error) => {
         Swal.fire({
             icon: 'error',
             title: '업로드 실패',
         });
         return false;
     });

 }