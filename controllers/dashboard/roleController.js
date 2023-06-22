import catchAsync from '../../utils/catchAsync.js';
import Role from '../../models/Role.js';
import Permission from '../../models/Permission.js';
import AppError from '../../utils/appError.js';
import RolePermission from '../../models/RolePermission.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import createReport from '../../utils/report.js';

export const getRoles = catchAsync(async (req, res, next) => {
  const obj = { include: RolePermission };
  const roles = await new ApiFeatures(Role, req.query, obj).get();
  res.json({ roles });
});

export const getRoleById = catchAsync(async (req, res, next) => {
  let role = await Role.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'name'],
    include: [
      {
        model: RolePermission,
        include: Permission,
      },
    ],
  });

  if (!role) {
    return next(new AppError('Role not found', 404));
  }

  role = role.toJSON();
  role.RolePermissions = role.RolePermissions.map(
    (rolePermission) => rolePermission.Permission.name,
  );
  res.json({ role });
});

export const createRole = catchAsync(async (req, res, next) => {
  const role = await Role.create({
    name: req.body.name,
  });
  // if req.body.permissions has the permission of id 13 append the ids 6 and 11 also to the array
  if (req.body.permissions.includes(13)) {
    req.body.permissions.push(6, 11);
  }

  const rolePermissions = req.body.permissions.map((permissionId) => ({
    role_id: role.id,
    permission_id: permissionId,
  }));

  for (const rolePermission of rolePermissions) {
    const { permission_id } = rolePermission;

    const permissionExists = await Permission.findOne({
      where: { id: permission_id },
    });
    if (!permissionExists) {
      return next(new AppError(`Permission ${permission_id} not found`, 404));
    }
  }

  await RolePermission.bulkCreate(rolePermissions);

  await createReport(req, `created role named ${role.name} created`);

  res.status(201).json({ message: 'Role created with permissions' });
});

export const updateRole = catchAsync(async (req, res, next) => {
  const roleId = req.params.id;

  const role = await Role.findOne({ where: { id: roleId } });
  if (!role) {
    return next(new AppError(`Role with ID ${roleId} not found`, 404));
  }

  if (req.body.name) {
    role.name = req.body.name;
    await role.save();
  }

  if (!req.body.permissions && req.body.name) {
    await createReport(req, `updated role named ${role.name}`);
    return res.status(200).json({ message: 'Role updated successfully' });
  }

  const rolePermissions = req.body.permissions.map((permissionId) => ({
    role_id: roleId,
    permission_id: permissionId,
  }));
  for (const rolePermission of rolePermissions) {
    const { permission_id } = rolePermission;
    const permissionExists = await Permission.findOne({
      where: { id: permission_id },
    });
    if (!permissionExists) {
      return next(new AppError(`Permission ${permission_id} not found`, 404));
    }
  }

  await RolePermission.destroy({ where: { role_id: roleId } });

  await RolePermission.bulkCreate(rolePermissions);

  await createReport(req, `updated role named ${role.name}`);

  res.status(200).json({ message: 'Role updated successfully' });
});

export const deleteRole = catchAsync(async (req, res, next) => {
  const role = await Role.findOne({
    where: { id: req.params.id },
  });
  if (!role) {
    return next(new AppError('Role not found', 404));
  }
  await role.destroy();

  await createReport(req, `deleted role named ${role.name}`);
  res.json({ role });
});

export const getPermissions = catchAsync(async (req, res, next) => {
  const permissions = await Permission.findAll({
    attributes: ['id', 'name'],
  });
  res.json({ permissions });
});
