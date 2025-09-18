# crudcli

[![npm version](https://img.shields.io/npm/v/crudcli.svg?color=blue)](https://www.npmjs.com/package/crudcli)
[![npm downloads](https://img.shields.io/npm/dt/crudcli.svg?color=green)](https://www.npmjs.com/package/crudcli)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**crudcli** is a lightweight **Node.js CLI tool** that helps you scaffold C# **Command** and **CommandHandler** classes following the [MediatR](https://github.com/jbogard/MediatR) pattern.  
It’s designed to speed up development by generating boilerplate code with consistent namespaces based on your folder structure.

---

## 🚀 Installation

Install globally with npm:

```bash
npm install -g crudcli

Or run it instantly with npx (no global install required):

npx crudcli@latest --help

🛠 Usage
crudcli <EntityName> [ReturnType] --startup <FolderName>


<EntityName> → The name of your entity (e.g. Client, Order).

[ReturnType] → The return type of the command (default: Guid).

--startup <FolderName> → The root folder from which the namespace will be generated (inclusive).

👉 Files are created in the current directory where you execute the command.

📂 Example

Suppose you are inside:

/home/user/MyApp/src/Application/Clients/Commands

Run:

crudcli Client Guid --startup src


This will generate:

CreateClientCommand.cs
CreateClientCommandHandler.cs

📝 Generated Files

CreateClientCommand.cs

using MediatR;

namespace Src.Application.Clients.Commands
{
    public record CreateClientCommand(
        // TODO: add Client properties
    ) : IRequest<Guid>;
}


CreateClientCommandHandler.cs

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

🔧 Development

Clone the repo and link it locally:

git clone https://github.com/<your-username>/crudcli.git
cd crudcli
npm install
npm link


Now you can run the CLI directly:

crudcli Order Guid --startup Application

📖 Notes

The namespace is automatically derived from your folder structure starting at the folder provided in --startup.

Files are created in the current path.

Requires Node.js v18+.
