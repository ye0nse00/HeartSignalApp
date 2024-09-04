package io.ionic.starter;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;
import com.getcapacitor.BridgeActivity;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

public class MainActivity extends BridgeActivity {

    private static final int REQUEST_ENABLE_BT = 1;  // Bluetooth 활성화 요청 코드
    private static final UUID MY_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");  // HC-05 기본 UUID
    private BluetoothSocket mmSocket;
    private TextView textView;  // UI에서 데이터를 표시할 TextView

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        if (bluetoothAdapter == null) {
            // 디바이스가 블루투스를 지원하지 않을 때의 처리
        } else {
            if (!bluetoothAdapter.isEnabled()) {
                Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
            }
        }

        // HC-05의 MAC 주소를 사용하여 BluetoothDevice 객체를 가져옴
        BluetoothDevice mmDevice = bluetoothAdapter.getRemoteDevice("48:87:2D:6C:FA:D6");

        try {
            mmSocket = mmDevice.createRfcommSocketToServiceRecord(MY_UUID);
            mmSocket.connect();  // Bluetooth 연결 시도
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Bluetooth를 통해 데이터 수신 및 UI에 표시
        new Thread(() -> {
            InputStream inputStream;
            try {
                inputStream = mmSocket.getInputStream();
                byte[] buffer = new byte[1024];
                int bytes;

                SharedPreferences sharedPreferences = getSharedPreferences("MyAppPrefs", MODE_PRIVATE);

                while ((bytes = inputStream.read(buffer)) != -1) {
                    String data = new String(buffer, 0, bytes);

                    // SharedPreferences에 데이터 저장
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("bluetooth_data", data);
                    editor.apply();

                    runOnUiThread(() -> {
                        // 수신한 데이터를 UI에 표시
                        textView.setText(data);
                    });
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
