# Hello Madam – Security Specification & Hardened Red Team TDD

## 1. Data Invariants
1. **Identity & Roles**: Only verified authenticated users (`request.auth.token.email_verified == true`) may write data. The bootstrapped owner (`shubhadabilla@gmail.com`) or an active `owner` in `/profiles/{uid}` has full admin access. A customer may never self-assign `role: 'owner'` or `role: 'beautician'` unless an owner-issued `/beautician_invites/{email}` exists for their verified email.
2. **Preferred vs Assigned Beautician Separation**: Customers may set `preferredBeauticianId` on creation, MUST set `assignedBeauticianId: ""`, `assignmentStatus: "unassigned"`, and `status: "pending"`. Only the owner can set `assignedBeauticianId`, confirm, reject, or reassign appointments.
3. **Beautician Scope Isolation**: A beautician can ONLY read appointments where `assignedBeauticianUid == request.auth.uid` or `(assignedBeauticianEmail == request.auth.token.email && assignedBeauticianId != "")`. She CANNOT list all appointments, view other beauticians' appointments, view `/customers`, modify service pricing, approve pending bookings, or reassign appointments.
4. **Beautician State Machine**: A beautician may only transition an assigned appointment via allowed fields (`status`, `beauticianNote`, `updatedAt`) when `existing().status in ['assigned', 'confirmed', 'in_progress']` and may never modify `estimatedTotal`, `items`, `assignedBeauticianId`, or `createdAt`.
5. **Terminal Locking**: Completed or cancelled appointments cannot be modified by customers or beauticians (`isOwner()` override only).
6. **PII Isolation**: `/customers`, `/team_members`, `/notification_logs`, `/appointment_assignments`, `/booking_status_history` are never publicly readable. Non-sensitive beautician display cards live in `/public_beauticians`.
7. **Temporal Integrity**: `createdAt` equals `request.time` on creation and is immutable on update; `updatedAt` equals `request.time` on update.

## 2. The "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. **Customer Role Escalation**: Customer creates `/profiles/{uid}` with `role: "owner"`. -> DENIED.
2. **Self-Claim Beautician Role Without Invite**: Customer creates `/profiles/{uid}` with `role: "beautician"` when no `/beautician_invites/{email}` exists. -> DENIED.
3. **Customer Auto-Confirms Appointment**: Customer creates `/appointments/{id}` with `status: "confirmed"` or `assignedBeauticianId: "sneha"`. -> DENIED.
4. **Cross-Customer Read**: Customer A tries `get(/appointments/{custB_apptId})` or lists without `customerUid == auth.uid`. -> DENIED.
5. **Beautician Reads All Customers**: Beautician calls `list(/customers)`. -> DENIED.
6. **Beautician Reads Another Beautician's Appointment**: Beautician Pooja calls `get(/appointments/{sneha_apptId})`. -> DENIED.
7. **Beautician Reads Unassigned Preferred Booking**: Customer prefers Sneha (`preferredBeauticianId: "sneha"`, `assignedBeauticianId: ""`, `status: "pending"`); Sneha tries to read it before owner assignment. -> DENIED.
8. **Beautician Approves Pending Booking / Changes Assignment**: Beautician updates `assignedBeauticianId` or `status: "confirmed"` on an appointment. -> DENIED.
9. **Beautician Tampers With Price**: Beautician updates `estimatedTotal: 1` while marking service completed. -> DENIED.
10. **Beautician Modifies Service Price**: Beautician writes `/services/{id}` with new `price`. -> DENIED.
11. **Shadow Field Injection / Ghost Keys**: Client submits `isVerified: true` or `freeOverride: true` in `/appointments` or `/profiles`. -> DENIED by `keys().hasOnly(...)`.
12. **Unverified Email Spoofing / Timestamp Forgery**: User with `email_verified: false` or forged `createdAt` attempts write. -> DENIED.
