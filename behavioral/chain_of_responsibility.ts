interface Handler<Request = string, Result = string> {
    setNext(handler: Handler<Request, Result>): Handler<Request, Result>;
    handle(request: Request): Result;
}

abstract class AbstractHandler implements Handler<string, string> {
    private nextHandler: Handler<string, string> | null = null;

    public setNext(handler: Handler<string, string>): Handler<string, string> {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return `the HTTP ${request} method was not recognized`;
    }
}

class GetHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'GET') {
            return `the HTTP ${request} method is called`;
        }
        return super.handle(request);
    }
}

class PostHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'POST') {
            return `the HTTP ${request} method is called`;
        }
        return super.handle(request);
    }
}

class PutHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'PUT') {
            return `the HTTP ${request} method is called`;
        }
        return super.handle(request);
    }
}

// client code
const clientCode = (handler: Handler): void => {
    const methods = ['GET', 'POST', 'PUT'];

    methods.forEach(method => {
        const result = handler.handle(method);
        console.log(result);
    })
}

const getHandler = new GetHandler();
const postHandler = new PostHandler();
const putHandler = new PutHandler();

getHandler.setNext(postHandler).setNext(putHandler);

clientCode(getHandler);
clientCode(postHandler);