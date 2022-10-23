# SQL File Description
## Table Overview
 <table class="relative-table wrapped confluenceTable stickyTableHeaders" style="width: 68.4381%; padding: 0px;" resolved="">
    <thead class="tableFloatingHeaderOriginal" style="position: static; margin-top: 0px; left: 345.989px; z-index: 3; width: 971px; top: 40px;">
    </thead>
    <thead class="tableFloatingHeader" style="display: none;"><tr>
      <th class="confluenceTh"><br></th><th class="confluenceTh">Table Name</th>
      <th class="confluenceTh">Comment</th>
    </tr>
    </thead>
    <colgroup>
      <col style="width: 21.6118%;">
      <col style="width: 45.5946%;">
      <col style="width: 32.7994%;">
    </colgroup>
    <tbody>
    <tr>
      <td style="text-align: center;" rowspan="6" class="confluenceTd">Authority table</td>
      <td colspan="1" class="confluenceTd">auth_group</td>
      <td colspan="1" class="confluenceTd">authority group created by administrator</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">auth_group_permissions</td>
      <td colspan="1" class="confluenceTd">permissions that groups have&nbsp;</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">auth_permission</td>
      <td colspan="1" class="confluenceTd">authority permissions</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">auth_user</td>
      <td colspan="1" class="confluenceTd">the user of system</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">auth_user_groups</td>
      <td colspan="1" class="confluenceTd">groups that users belong to</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">auth_user_user_permissions</td>
      <td colspan="1" class="confluenceTd">permissions that user have</td>
    </tr>
    <tr>
      <td style="text-align: center;" rowspan="10" class="confluenceTd">AWARE table</td>
      <td class="confluenceTd">applications_foreground</td>
      <td class="confluenceTd">data for app usage</td>
    </tr>
    <tr>
      <td class="confluenceTd">aware_device</td>
      <td class="confluenceTd">device info</td>
    </tr>
    <tr>
      <td class="confluenceTd">battery</td>
      <td class="confluenceTd">data for battery status</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">battery_charges</td>
      <td colspan="1" class="confluenceTd">data for battery charges info</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">battery_discharges</td>
      <td colspan="1" class="confluenceTd">data for battery discharges info</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">bluetooth</td>
      <td colspan="1" class="confluenceTd">bluetooth usage</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">calls</td>
      <td colspan="1" class="confluenceTd">calls info</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">locations</td>
      <td colspan="1" class="confluenceTd">locations record</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">messages</td>
      <td colspan="1" class="confluenceTd">messages info</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">screen</td>
      <td colspan="1" class="confluenceTd">screen status</td>
    </tr>
    <tr>
      <td style="text-align: center;" rowspan="6" class="confluenceTd">project table</td>
      <td colspan="1" class="confluenceTd">tb_client</td>
      <td colspan="1" class="confluenceTd">patient profile</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">tb_loc_cluster</td>
      <td colspan="1" class="confluenceTd">calculate the centroid of location cluster</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">twitter_word_cloud</td>
      <td colspan="1" class="confluenceTd">analysis data for twitter word cloud</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">twitter_hashtag</td>
      <td colspan="1" class="confluenceTd">analysis data for twitter hashtag</td>
    </tr>
    <tr>
      <td colspan="1" class="confluenceTd">twitter_topics</td>
      <td colspan="1" class="confluenceTd">analysis data for twitter topics</td>
    </tr>
    </tbody>
  </table>

## Table Relationship
![image](/backend/DataBase/image.png)

## There are two files in this fold:

### 1. swen90013_db_init.sql
This is the database structure dump file, `no data only structure` of database and table.<br>
If only want to initial the empty database, import this SQL file only.
  
### 2. swen90013_db_init_data.sql
 This is the data dump file, `only contains data`.<br>
If want to replay the development data, first to import 'swen90013_db_init.sql' and then import this SQL file.

