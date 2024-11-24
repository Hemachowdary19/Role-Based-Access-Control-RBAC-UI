// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("hidden");
}

// Manage Users
const users = [
    { id: 1, name: "Alice", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", role: "User", status: "Inactive" },
];

function loadUsers() {
    const userTableBody = document.querySelector("#userTable tbody");
    userTableBody.innerHTML = users
        .map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>${user.status}</td>
                <td>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `)
        .join("");
}

function showAddUserModal() {
    alert("This feature is not implemented yet!");
}

function editUser(id) {
    alert(`Edit user with ID: ${id}`);
}

function deleteUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        loadUsers();
    }
}

// Manage Roles
const roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
];

function loadRoles() {
    const roleTableBody = document.querySelector("#roleTable tbody");
    roleTableBody.innerHTML = roles
        .map(role => `
            <tr>
                <td>${role.id}</td>
                <td>${role.name}</td>
                <td>${role.permissions.join(", ")}</td>
                <td>
                    <button onclick="editRole(${role.id})">Edit</button>
                    <button onclick="deleteRole(${role.id})">Delete</button>
                </td>
            </tr>
        `)
        .join("");
}

function showAddRoleModal() {
    const roleModal = document.querySelector("#roleModal");
    roleModal.style.display = "block";
    document.getElementById("modalTitle").textContent = "Add Role";
    document.getElementById("roleName").value = "";
    const checkboxes = document.querySelectorAll("#permissionsContainer input");
    checkboxes.forEach(checkbox => (checkbox.checked = false));
}

function closeRoleModal() {
    const roleModal = document.querySelector("#roleModal");
    roleModal.style.display = "none";
}

function saveRole() {
    const roleName = document.getElementById("roleName").value;
    const permissions = Array.from(
        document.querySelectorAll("#permissionsContainer input:checked")
    ).map(input => input.value);

    if (!roleName) {
        alert("Role name is required!");
        return;
    }

    roles.push({ id: roles.length + 1, name: roleName, permissions });
    closeRoleModal();
    loadRoles();
}

function editRole(id) {
    const role = roles.find(role => role.id === id);
    if (role) {
        const roleModal = document.querySelector("#roleModal");
        roleModal.style.display = "block";
        document.getElementById("modalTitle").textContent = "Edit Role";
        document.getElementById("roleName").value = role.name;

        const checkboxes = document.querySelectorAll("#permissionsContainer input");
        checkboxes.forEach(checkbox => {
            checkbox.checked = role.permissions.includes(checkbox.value);
        });
    }
}

function deleteRole(id) {
    const index = roles.findIndex(role => role.id === id);
    if (index !== -1) {
        roles.splice(index, 1);
        loadRoles();
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadRoles();

    // Close modals when clicking outside
    window.addEventListener("click", event => {
        const roleModal = document.querySelector("#roleModal");
        if (event.target === roleModal) {
            roleModal.style.display = "none";
        }
    });
});
