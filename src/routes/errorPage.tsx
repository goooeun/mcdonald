import { useRouteError } from 'react-router-dom';

interface RouteError {
    status: number;
    statusText: string;
    data: any;
    message: string | null;
}

function ErrorPage() {
    const error = useRouteError() as RouteError;

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;
