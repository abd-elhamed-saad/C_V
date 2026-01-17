# Notification Manager - Image Documentation Guide

## Complete Workflow with Screenshots

This guide explains each screenshot in the order of the module workflow.

---

### 1. Settings Menu Access
**File:** `01_settings_menu.png`
**Description:** Access the Notification Manager from Odoo Settings
- Navigate to Settings → General Settings
- Scroll down to find "Notification Manager" section
- Shows the configuration options available in settings

---

### 2. Notification Configuration Form
**File:** `02_notification_config_form.png`
**Description:** Create New Notification Configuration
- Configuration Name: "confirm Sale order"
- Model & Method section with dropdown for selecting model
- Button/Method dropdown for selecting trigger action
- Domain Filter section with examples
- Statistics panel showing Total Sent, Success, Failed counts

---

### 3. Button/Method Selection
**File:** `03_button_method_selection.png`
**Description:** Select the Button/Method that triggers notification
- Dropdown showing available methods for selected model
- Examples: Sales Order, Sales Team, Work Center Usage, Confirm, etc.
- "Search More..." option for additional methods
- Shows both standard and custom methods

---

### 4. Recipient Type Selection
**File:** `04_recipient_type_selection.png`
**Description:** Choose how to select notification recipients
- Options:
  - Specific Users
  - User Groups
  - Field on Record
  - Followers
- Each option configures who receives the notification

---

### 5. Specific Users Selection
**File:** `05_specific_users_selection.png`
**Description:** Select individual users to notify
- Dropdown shows all system users
- Multiple users can be selected
- Example shows: Administrator, CAPRI USER
- "Search More..." and "Start typing..." features

---

### 6. User Groups Selection
**File:** `06_user_groups_selection.png`
**Description:** Notify all users in selected groups
- Shows all available user groups
- Examples:
  - Technical / Access Rights
  - Technical / Export Feature
  - Dashboard / Admin
  - Recruitment / Administrator
- Notifies ALL users belonging to selected groups

---

### 7. Field on Record Selection
**File:** `07_field_on_record_selection.png`
**Description:** Select user field from the record
- Dynamically fetch users from record fields
- Examples for Sale Order:
  - Responsible User (activity_user_id)
  - Salesperson (user_id)
  - Created by (create_uid)
  - Last Updated by (write_uid)
- Supports relational fields like partner_id.user_id

---

### 8. Followers Recipient
**File:** `08_followers_recipient.png`
**Description:** Notify all followers of the record
- Automatically sends to all document followers
- Works with models that have mail.thread inheritance
- No additional configuration needed

---

### 9. Notification Types
**File:** `09_notification_types.png`
**Description:** Select notification delivery method
- **Inbox Message**: Internal Odoo notification
- **Email**: Send email notification
- **Activity/Task**: Create activity for user
- **SMS**: Send SMS message (requires SMS module)

---

### 10. Activity Type Selection
**File:** `10_activity_type_selection.png`
**Description:** When using Activity/Task notification type
- Choose activity type from dropdown:
  - Email
  - Call
  - Meeting
  - Maintenance Request
  - Expense Approval
  - Order Upsell
  - Time Off Approval
  - etc.
- Activity appears in user's activity panel

---

### 11. Message Subject & Body
**File:** `11_message_subject_body.png`
**Description:** Configure message content
- **Subject**: Notification subject line (e.g., "Notification Test")
- **Message Body**: Use variables like {record.name}
- Supports HTML formatting
- Variables are replaced with actual record data

---

### 12. Recipients Configured
**File:** `12_recipients_configured.png`
**Description:** Final recipient configuration view
- Shows selected Recipient Type: "Specific Users"
- Lists selected users: Administrator
- All configuration tabs visible:
  - Trigger Configuration
  - Recipients ✓
  - Message
  - Settings

---

### 13. Send Test & Activities Panel
**File:** `13_send_test_activities.png`
**Description:** Test notification and view results
- "Send Test" button to test configuration
- Right panel shows Activities:
  - Maintenance Request (1 Late, 0 Today)
  - Lead/Opportunity (1 Late, 0 Today)
  - **Sales Order (0 Late, 1 Today)** ← New activity created!
  - Purchase Order (1 Late, 0 Today)
  - Time Off Allocation (2 Late, 0 Today)
- Confirms notification was sent successfully

---

### 14. Template Form View
**File:** `14_template_form.png`
**Description:** Create reusable notification templates
- Template Name: "Sale Order Confirmed"
- Model: Sales Order
- Subject Template with variables
- HTML Body tab with message content
- Shows template structure with bullet points

---

### 15. Template Available Variables
**File:** `15_template_available_variables.png`
**Description:** View all available variables for template
- "Available Variables" tab shows:
  - {record.activity_calendar_event_id.display_name}
  - {record.activity_type_id.name}
  - {record.campaign_id.display_name}
  - {record.company_id.name}
  - {record.currency_id.name}
  - {record.opportunity_id.display_name}
  - etc.
- All field variables automatically generated
- Copy and use in subject or body

---

### 16. Template Plain Text
**File:** `16_template_plain_text.png`
**Description:** Plain text version of template
- Alternative to HTML body
- Used for SMS or email fallback
- Simple text with variables
- Example: "Sale Order {record.name} confirmed for {record.partner_id.name}, Amount: {record.amount_total}"

---

### 17. Configuration with Template
**File:** `17_config_with_template.png`
**Description:** Use template in notification configuration
- "Use Template" checkbox enabled (marked as ①)
- "Template" dropdown showing "Sale Order Confirmed" (marked as ②)
- Activity Type: Call
- Template automatically populates subject and message

---

### 18. Sale Order with Activities
**File:** `18_sale_order_activities.png`
**Description:** Sale Order showing notification activity
- Sale Order number: S00023
- Customer, Order Date, Salesperson visible
- **Activities column shows: "Notification Test"** ← Activity created by notification!
- Total amount: 54,741.66 LE

---

### 19. Activity Notification Detail
**File:** `19_activity_notification_detail.png`
**Description:** Detailed view of created activity
- Activity panel on right side
- "Notification Test" for Administrator
- Message content from template:
  - **Order**: S00023
  - **Customer**: مشروع السويس (Arabic customer name)
  - **Amount**: 54741.66
  - **Salesperson**: Administrator
- "Please process this order accordingly" message
- Buttons: Mark Done, Edit, Cancel
- Created: Dec 3, 2025

---

### 20. Notification Logs
**File:** `20_notification_logs.png`
**Description:** Track all sent notifications
- List view of all notification logs
- Two entries visible:
  - "Notification Test" - sale.order - S00023
  - Status: ✓ Sent
  - Type: 📋 Activity
  - Recipient: 👤 Administrator
  - Timestamp: 12/30/2025 14:36:04 and 14:32:12
- Click icon to view original record
- Filter: "Today" to see recent notifications

---

## Workflow Summary

1. **Access Settings** → Navigate to Notification Manager
2. **Create Configuration** → Define notification name and description
3. **Select Model & Method** → Choose what triggers the notification
4. **Configure Recipients** → Select who receives notification
5. **Choose Notification Type** → Inbox, Email, Activity, or SMS
6. **Set Message Content** → Write subject and body (or use template)
7. **Test Configuration** → Use "Send Test" button
8. **Verify Activity** → Check activity was created
9. **View Logs** → Track all sent notifications
10. **Monitor Statistics** → See success/failure rates

---

## Key Features Demonstrated

✅ **Multiple Recipient Types**: Users, Groups, Fields, Followers
✅ **Multiple Notification Channels**: Inbox, Email, Activity, SMS
✅ **Template System**: Reusable templates with variables
✅ **Activity Integration**: Creates activities in user's panel
✅ **Comprehensive Logging**: Track every notification sent
✅ **Test Functionality**: Test before activating
✅ **Statistics**: Monitor success/failure rates
✅ **Variable Support**: Use {record.field} in messages
✅ **Domain Filters**: Send only when conditions met

---

**Total Screenshots**: 20 images covering complete workflow
**Workflow Coverage**: From setup to testing to monitoring
**Use Cases Shown**: Sale Order confirmation notifications
