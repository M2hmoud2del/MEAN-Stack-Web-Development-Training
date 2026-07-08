enum Role{
    Admin,
    Editor,
    Viewer,
}

function getRole(role: Role): string { 
    switch (role) {
        case Role.Admin:
            return "Admin";
        case Role.Editor:
            return "Editor";
        case Role.Viewer:
            return "Viewer";
        default:
            return "Unknown";
    }
}

function checkAccess(role: Role): void {
    if (role === Role.Admin) {
        console.log("Access granted: You have full access.");
    } else if (role === Role.Editor) {
        console.log("Access granted: You can edit content.");
    } else if (role === Role.Viewer) {
        console.log("Access granted: You can view content.");
    } else {
        console.log("Access denied: Unknown role.");
    }
}

checkAccess(Role.Admin);
checkAccess(Role.Editor);
checkAccess(Role.Viewer);
checkAccess(3 as Role); // Invalid role (cast to Role), will be treated as unknown