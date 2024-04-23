

interface FormProps {
	isCreate: boolean;
	handleReturnButton: () => void;
}

export const Form = ({
	isCreate,
	handleReturnButton,
}: FormProps) => {

	return (
		<h1>SocioFormulario</h1>
	);
};
