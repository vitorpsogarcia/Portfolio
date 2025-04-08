document.addEventListener("DOMContentLoaded", function () {
	const menuBtn = document.querySelector(".mobile-menu-btn");
	const mobileNav = document.querySelector(".mobile-nav");
	const footerIp = document.querySelector(".footer-ip");

	menuBtn.addEventListener("click", function () {
		mobileNav.classList.toggle("active");

		const icon = menuBtn.querySelector("i");
		if (mobileNav.classList.contains("active")) {
			icon.classList.remove("fa-bars");
			icon.classList.add("fa-times");
		} else {
			icon.classList.remove("fa-times");
			icon.classList.add("fa-bars");
		}
	});

	const mobileLinks = document.querySelectorAll(".mobile-nav a");
	mobileLinks.forEach((link) => {
		link.addEventListener("click", function () {
			mobileNav.classList.remove("active");
			const icon = menuBtn.querySelector("i");
			icon.classList.remove("fa-times");
			icon.classList.add("fa-bars");
		});
	});

	document.getElementById("current-year").textContent =
		new Date().getFullYear();

	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			if (targetId === "#") return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const headerHeight = document.querySelector(".header").offsetHeight;
				const targetPosition =
					targetElement.getBoundingClientRect().top +
					window.pageYOffset -
					headerHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	const animateOnScroll = function () {
		const elements = document.querySelectorAll(
			".skill-card, .project-card, .contact-item"
		);

		elements.forEach((element) => {
			const elementPosition = element.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			if (elementPosition < windowHeight - 100) {
				element.classList.add("animate");
			}
		});
	};

	animateOnScroll();

	window.addEventListener("scroll", animateOnScroll);

	const projectCards = document.querySelectorAll(".project-card");
	projectCards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.querySelector(".project-image img").style.transform = "scale(1.05)";
		});

		card.addEventListener("mouseleave", function () {
			this.querySelector(".project-image img").style.transform = "scale(1)";
		});
	});

	async function getUserIp() {
		const response = await fetch("https://api.ipify.org?format=json");
		if (response.ok) {
			const data = await response.json();
			updateUserIp(data.ip);
		} else {
			console.error("Error fetching IP address:", response.statusText);
		}
	}

	function updateUserIp(ip) {
		footerIp.textContent = `Seu IPv4: ${ip}`;
	}

	getUserIp();
});
