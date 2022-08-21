 function none(){}
 export function upload(input, parameters = {}){
    let files = [];
    const onUpload = parameters.onUpload ?? none;
    const el = document.querySelector(input);
    if(parameters.multiple){el.setAttribute('multiple', true);}
    if(parameters.fileType && Array.isArray(parameters.fileType)){el.setAttribute('accept', parameters.fileType.join(','));}
    document.querySelector('.add__attachment label').addEventListener('click', function(){ el.click(); });
    let attachFiles = (e) =>{
        if(!e.target.files.length){ return false; }
        document.querySelector('.attachments').innerHTML = '';
        files = Array.from(e.target.files);
        files.forEach(file => {
            if(!file.type.match('image')){ return false; }
            const reader = new FileReader();
            reader.onload = ev =>{
                document.querySelector('.attachments').classList.add('filled');
                document.querySelector('.attachments').innerHTML += `
                <div class="content-image"> 
                    <div class="close" data-filename="${file.name}">
                        <span></span>
                        <span></span>
                    </div>
                    <img src='${ev.target.result}'>
                </div>
                `;
            }
            reader.readAsDataURL(file);
        });
    }
    let removeFile = (event) => {
        let {filename} = event.target.dataset ||  event.target.closest('.close').dataset;
        if(!filename) return false;
        files = files.filter(file => file !== filename);
        let att = document.querySelector('.attachments');
        att.querySelector(`[data-filename="${filename}"]`).closest('.content-image').remove();
    }
    let uploadFile = () =>{
        document.querySelectorAll('.attachments .close').forEach(e => e.remove());
        const fileEl = document.querySelectorAll('.content-image');
        onUpload(files);
    }
    document.querySelector('.attachments').addEventListener('click', removeFile);
    el.addEventListener('change', attachFiles);
    document.querySelector('.add button').addEventListener('click', uploadFile);
}