async function main(){
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            document.querySelector('.avatar').classList.add('show-image');
        }, 1000); // 1000 milliseconds = 1 second
    });
}

main()