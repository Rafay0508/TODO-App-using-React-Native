if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/AA/.gradle/caches/8.10.2/transforms/31c8cafa6819c5ba9fa0bd19502f5d94/transformed/hermes-android-0.76.3-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/AA/.gradle/caches/8.10.2/transforms/31c8cafa6819c5ba9fa0bd19502f5d94/transformed/hermes-android-0.76.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()
