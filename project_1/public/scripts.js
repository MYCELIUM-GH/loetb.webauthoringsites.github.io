$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		var links = this.el.find('.link');
		
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);
});
const fileInput = document.getElementById("images");
        const imagePreview = document.getElementById("imagePreview");
        let filesArray = [];

        fileInput.addEventListener("change", function() {
            const newFiles = Array.from(fileInput.files);

            if (filesArray.length + newFiles.length > 3) {
                document.getElementById("fileError").textContent = "You can upload a maximum of 3 images.";
                return;
            }

            filesArray = [...filesArray, ...newFiles];
            renderImagePreviews();
        });

        function renderImagePreviews() {
            imagePreview.innerHTML = "";
            filesArray.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgElement = document.createElement("img");
                    imgElement.src = e.target.result;

                    const removeBtn = document.createElement("span");
                    removeBtn.classList.add("remove-btn");
                    removeBtn.innerHTML = "x"; // Добавляем текст для кнопки

                    removeBtn.addEventListener("click", function() {
                        filesArray.splice(index, 1);
                        renderImagePreviews();
                    });

                    const imgWrapper = document.createElement("div");
                    imgWrapper.appendChild(imgElement);
                    imgWrapper.appendChild(removeBtn);

                    imagePreview.appendChild(imgWrapper);
                };
                reader.readAsDataURL(file);
            });

            // Disable file input if 3 images are selected
            if (filesArray.length >= 3) {
                fileInput.disabled = true;
            } else {
                fileInput.disabled = false;
            }
        }

        document.getElementById("contactForm").addEventListener("submit", function(event) {
            let valid = true;
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
                        // Reset error messages
                        document.getElementById("nameError").textContent = "";
            document.getElementById("emailError").textContent = "";
            document.getElementById("messageError").textContent = "";
            document.getElementById("fileError").textContent = "";

            // Name validation
            if (name.value.trim() === "") {
                document.getElementById("nameError").textContent = "Name is required.";
                valid = false;
            }

            // Email validation
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email.value)) {
                document.getElementById("emailError").textContent = "Please enter a valid email address.";
                valid = false;
            }

            // Message validation (max 250 words)
            const wordCount = message.value.trim().split(/\s+/).length;
            if (wordCount > 250) {
                document.getElementById("messageError").textContent = "Message cannot exceed 250 words.";
                valid = false;
            } else if (message.value.trim() === "") {
                document.getElementById("messageError").textContent = "Message is required.";
                valid = false;
            }

            // File validation
            if (filesArray.length > 3) {
                document.getElementById("fileError").textContent = "You can upload a maximum of 3 images.";
                valid = false;
            }

            if (!valid) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });