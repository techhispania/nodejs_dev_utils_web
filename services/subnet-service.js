function calculate_subnet_from_cicdr(cicdr) {
    // 1. split the cicdr to get the base IP and the sufix
    const base_ip = cicdr.split("/")[0]
    const sufix = cicdr.split("/")[1]

    console.log(`base_ip: ${base_ip}, sufix: ${sufix}`)

    // 2. convert base_ip to binary (it will be needed later to calculate network and broadcast addresses)
    const base_ip_first_octet = parseInt(base_ip.substring(0, 8), 10).toString(2)
    const base_ip_second_octet = parseInt(base_ip.substring(9, 17), 10).toString(2)
    const base_ip_third_octet = parseInt(base_ip.substring(18, 26), 10).toString(2)
    const base_ip_fourth_octet = parseInt(base_ip.substring(27, 35), 10).toString(2)
    console.log(`Binary base ip: ${base_ip_first_octet}.${base_ip_second_octet}.${base_ip_third_octet}.${base_ip_fourth_octet}`)


    // 3. calculate network mask from the sufix (/24 means that first 24 bits are 1 and the rest are 0)
    let binary_network_mask = ""
    const total_ip_bits = 32
    // fill all the bits that are "1"
    for (let i = sufix; i > 0; i--) {
        binary_network_mask = `${binary_network_mask}1`
    }
    // fill all the bits that are "0"
    for (let i = total_ip_bits - sufix; i > 0; i--) {
        binary_network_mask = `${binary_network_mask}0`
    }

    const first_octet = binary_network_mask.substring(0, 8)
    const second_octet = binary_network_mask.substring(8, 16)
    const third_octet = binary_network_mask.substring(16, 24)
    const fourth_octet = binary_network_mask.substring(24, 32)

    binary_network_mask = `${first_octet}.${second_octet}.${third_octet}.${fourth_octet}`
    network_mask = `${parseInt(first_octet, 2)}.${parseInt(second_octet, 2)}.${parseInt(third_octet, 2)}.${parseInt(fourth_octet, 2)}`

    console.log(`Binary network mask: ${binary_network_mask}`)
    console.log(`Network mask: ${network_mask}`)

    let binary_reverse_network_mask = ""
    for (let i = 0; i < total_ip_bits + 3; i++) {
        if (binary_network_mask[i] === "1") {
            binary_reverse_network_mask = `${binary_reverse_network_mask}0`
        } else if (binary_network_mask[i] === "0") {
            binary_reverse_network_mask = `${binary_reverse_network_mask}1`
        } else {
            binary_reverse_network_mask = `${binary_reverse_network_mask}.`
        }
    }
    console.log(`Reverse binary network mask: ${binary_reverse_network_mask}`)
    const reverse_first_octet = binary_reverse_network_mask.substring(0, 8)
    const reverse_second_octet = binary_reverse_network_mask.substring(9, 17)
    const reverse_third_octet = binary_reverse_network_mask.substring(18, 26)
    const reverse_fourth_octet = binary_reverse_network_mask.substring(27, 35)

    const reverse_network_mask = `${parseInt(reverse_first_octet, 2)}.${parseInt(reverse_second_octet, 2)}.${parseInt(reverse_third_octet, 2)}.${parseInt(reverse_fourth_octet, 2)}`
    console.log(`Reverse network mask: ${reverse_network_mask}`)

    // 4. calculate the network address with AND "&" of mask and base ip (The first IP of the range)
    const base_ip_array = base_ip.split(".")
    const network_mask_array = network_mask.split(".")
    
    let network_address_first_octet = base_ip_array[0]
    let network_address_second_octet = base_ip_array[1]
    let network_address_third_octet = base_ip_array[2]
    let network_address_fourth_octet = base_ip_array[3]

    let network_mask_first_octet = network_mask_array[0]
    let network_mask_second_octet = network_mask_array[1]
    let network_mask_third_octet = network_mask_array[2]
    let network_mask_fourth_octet = network_mask_array[3]

    if (network_mask_first_octet != "255") {
        network_address_first_octet = parseInt(network_address_first_octet, 10) & parseInt(first_octet, 2)
    }

    if (network_mask_second_octet != "255") {
        network_address_second_octet = parseInt(network_address_second_octet, 10) & parseInt(second_octet, 2)
    }

    if (network_mask_third_octet != "255") {
        network_address_third_octet = parseInt(network_address_third_octet, 10) & parseInt(third_octet, 2)
    }

    if (network_mask_fourth_octet != "255") {
        network_address_fourth_octet = parseInt(network_address_fourth_octet, 10) & parseInt(fourth_octet, 2)
    }
    const network_address = `${network_address_first_octet}.${network_address_second_octet}.${network_address_third_octet}.${network_address_fourth_octet}`
    console.log(`Network address: ${network_address}`)

    // 5. calculate the broadcast address with OR "|" of mask and base ip (The last IP of the range)
    let broadcast_address_first_octet = base_ip_array[0]
    let broadcast_address_second_octet = base_ip_array[1]
    let broadcast_address_third_octet = base_ip_array[2]
    let broadcast_address_fourth_octet = base_ip_array[3]
    if (network_mask_first_octet != "255") {
        broadcast_address_first_octet = parseInt(broadcast_address_first_octet, 10) | parseInt(reverse_first_octet, 2)
    }

    if (network_mask_second_octet != "255") {
        broadcast_address_second_octet = parseInt(broadcast_address_second_octet, 10) | parseInt(reverse_second_octet, 2)
    }

    if (network_mask_third_octet != "255") {
        broadcast_address_third_octet = parseInt(broadcast_address_third_octet, 10) | parseInt(reverse_third_octet, 2)
    }

    if (network_mask_fourth_octet != "255") {
        broadcast_address_fourth_octet = parseInt(broadcast_address_fourth_octet, 10) | parseInt(reverse_fourth_octet, 2)
    }
    const broadcast_address = `${broadcast_address_first_octet}.${broadcast_address_second_octet}.${broadcast_address_third_octet}.${broadcast_address_fourth_octet}`
    console.log(`Network address: ${network_address}`)


    // 6. calculate the first IP of the range, adding +1 to the network address already calculated
    let first_range_ip_first_octet = network_address_first_octet
    let first_range_ip_second_octet = network_address_second_octet
    let first_range_ip_third_octet = network_address_third_octet
    let first_range_ip_fourth_octet = network_address_fourth_octet

    if (network_address_fourth_octet < 255) {
        first_range_ip_fourth_octet = first_range_ip_fourth_octet + 1
    } else {
        if (network_address_third_octet < 255) {
            first_range_ip_third_octet = first_range_ip_third_octet + 1
            first_range_ip_fourth_octet = 0
        } else {
            if (network_address_second_octet < 255) {
                first_range_ip_second_octet = first_range_ip_second_octet + 1
                first_range_ip_third_octet = 0
                first_range_ip_fourth_octet = 0
            } else {
                if (network_address_first_octet < 255) {
                    first_range_ip_first_octet = first_range_ip_first_octet + 1
                    first_range_ip_second_octet = 0
                    first_range_ip_third_octet = 0
                    first_range_ip_fourth_octet = 0
                }
            }
        }
    }
    const first_range_ip = `${first_range_ip_first_octet}.${first_range_ip_second_octet}.${first_range_ip_third_octet}.${first_range_ip_fourth_octet}`

    // 7. calculate the last IP of the range, substracting -1 to the broadcast IP already calculated
    let last_range_ip_first_octet = broadcast_address_first_octet
    let last_range_ip_second_octet = broadcast_address_second_octet
    let last_range_ip_third_octet = broadcast_address_third_octet
    let last_range_ip_fourth_octet = broadcast_address_fourth_octet

    if (broadcast_address_fourth_octet > 0) {
        last_range_ip_fourth_octet = last_range_ip_fourth_octet - 1
    } else {
        if (broadcast_address_third_octet > 0) {
            last_range_ip_third_octet = last_range_ip_third_octet - 1
            last_range_ip_fourth_octet = 255
        } else {
            if (broadcast_address_second_octet > 0) {
                last_range_ip_second_octet = last_range_ip_second_octet - 1
                last_range_ip_third_octet = 255
                last_range_ip_fourth_octet = 255
            } else {
                if (broadcast_address_first_octet > 0) {
                    last_range_ip_first_octet = last_range_ip_first_octet - 1
                    last_range_ip_second_octet = 255
                    last_range_ip_third_octet = 255
                    last_range_ip_fourth_octet = 255
                }
            }
        }
    }
    const last_range_ip = `${last_range_ip_first_octet}.${last_range_ip_second_octet}.${last_range_ip_third_octet}.${last_range_ip_fourth_octet}`

    console.log("======== FINAL RESULTS ========")
    console.log(`Network address: ${network_address}`)
    console.log(`Broadcast address: ${broadcast_address}`)
    console.log(`First Range IP: ${first_range_ip}`)
    console.log(`Last range IP: ${last_range_ip}`)

    return {
        network_address: network_address,
        broadcast_address: broadcast_address,
        first_range_ip: first_range_ip,
        last_range_ip: last_range_ip
    }
}

module.exports = {calculate_subnet_from_cicdr}