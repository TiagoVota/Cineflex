import Swal from 'sweetalert2'


const errorModal = (text) => {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text
	})
}

// TODO: Olá Thiago, eu tenho usado os mesmos padrões para modal nos projetos,
// volta e meia eu acabo alterando alguma coisa deles e melhorando. Para esse
// projeto eu acabei não utilizando o modal de sucesso. Vale a pena mesmo assim
// eu manter o código dele aqui (penso em algo tipo 'possível usu futuro', por-
// que nesse caso é algo bem útil, e não um código legado), ou eu jogo fora?
const successModal = (title, showConfirmButton, timer) => {
	showConfirmButton = showConfirmButton || false
	timer = timer || 1500

	Swal.fire({
		icon: 'success',
		title,
		showConfirmButton,
		timer
	})
}


export {
	errorModal,
	successModal,
}
