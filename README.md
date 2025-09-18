# crudcli

A simple **Node.js CLI tool** to scaffold C# **Command** and **CommandHandler** classes with [MediatR](https://github.com/jbogard/MediatR).

## 🚀 Installation

You can install it globally:

```bash
npm install -g crudcli
Or run it without installing (recommended for trying it out):

bash
Copy code
npx crudcli@latest --help
🛠 Usage
bash
Copy code
crudcli <EntityName> [ReturnType] --startup <FolderName>
<EntityName>: The entity for which you want to generate a command.

[ReturnType]: The return type of the command (default: Guid).

--startup <FolderName>: Defines the root folder from which the namespace will be generated (included).

👉 The files are created in the current directory where you run the command.

Example
If you are inside:

swift
Copy code
/home/user/MyApp/src/Application/Clients/Commands
And you run:

bash
Copy code
crudcli Client Guid --startup src
It will generate:

Copy code
CreateClientCommand.cs
CreateClientCommandHandler.cs
Generated Files
CreateClientCommand.cs

csharp
Copy code
using MediatR;

namespace Src.Application.Clients.Commands
{
    public record CreateClientCommand(
        // TODO: add Client properties
    ) : IRequest<Guid>;
}
CreateClientCommandHandler.cs

csharp
Copy code
using MediatR;

namespace Src.Application.Clients.Commands
{
    public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, Guid>
    {
        public CreateClientCommandHandler()
        {
        }

        public async Task<Guid> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            // TODO: implement Client creation logic
            return Guid.NewGuid();
        }
    }
}
📦 Development
Clone the repository and link the CLI locally:

bash
Copy code
git clone https://github.com/<your-username>/crudcli.git
cd crudcli
npm install
npm link
Now you can run the CLI locally:

bash
Copy code
crudcli Order Guid --startup Application
📖 Notes
The namespace is automatically built from the path starting at the folder passed in --startup.

Files will not overwrite existing ones (unless you add support for a --force flag).

Requires Node.js 18+.
